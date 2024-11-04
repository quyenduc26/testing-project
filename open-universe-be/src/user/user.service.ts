import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, Like } from 'typeorm';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ResponseUserDTO } from './dto/response-user.dto';
import { RequestService } from 'src/request/request.service';

import { ResponseLoginDto } from './dto/response-login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private requestService: RequestService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDTO> {
    const newUser = await this.mapToCreateUserDTO(createUserDto);
    const savedUser = await this.userRepository.save(newUser);
    const ResponseUserDTO = {
      id: savedUser.id,
      fullName: savedUser.full_name,
      userName: savedUser.user_name,
      email: savedUser.email,
    };
    return ResponseUserDTO;
  }

  // UPDATE USER
  async update(id: number, updateUserDto: Partial<UpdateUserDto>): Promise<ResponseUserDTO> {
    const newUser = new User();
    newUser.user_name = updateUserDto.userName;
    newUser.full_name = updateUserDto.fullName;
    newUser.email = updateUserDto.email;
    newUser.phone_number = updateUserDto.phoneNumber;
    newUser.date_of_birth = updateUserDto.dateOfBirth;
    newUser.role = updateUserDto.role;
    newUser.gender = updateUserDto.gender;
    newUser.password = updateUserDto.password;
    newUser.avatar = updateUserDto.avatar;
    newUser.instagram = updateUserDto.instagram;
    newUser.facebook = updateUserDto.facebook;
    newUser.biography = updateUserDto.biography;
    newUser.cover = updateUserDto.cover;

    const updateResult = await this.userRepository.update(id, newUser);
    if (updateResult.affected === 0) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.userRepository.findOne({ where: { id: id } });
    const ResponseUserDTO = {
      id: updatedUser.id,
      fullName: updatedUser.full_name,
      userName: updatedUser.user_name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phone_number,
      gender: updatedUser.gender,
      role: updatedUser.role,
      status: updatedUser.status,
    };
    return ResponseUserDTO;
  }

  async findAll(): Promise<ResponseUserDTO[]> {
    try {
      const users = await this.userRepository.find();
      const ResponseUserDTOs = users.map((user) => this.mapToResponseUserDTO(user));
      return ResponseUserDTOs;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }

  async findOne(userId: number, targetUserId: number): Promise<ResponseUserDTO> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: { address: true },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      const targetUser =
        userId !== targetUserId
          ? await this.userRepository.findOne({ where: { id: targetUserId } })
          : user;

      if (!targetUser) {
        throw new NotFoundException('Target user not found');
      }

      const isAdmin = user.role === 'admin';

      return isAdmin
        ? this.mapToResponseUserDTO(targetUser)
        : {
            id: targetUser.id,
            fullName: targetUser.full_name,
            userName: targetUser.user_name,
            email: targetUser.email,
            phoneNumber: targetUser.phone_number,
            gender: targetUser.gender,
            address: targetUser.address,
          };
    } catch (error) {
      throw new Error('Failed to fetch user');
    }
  }

  async findOneToLogin(userName: string): Promise<ResponseLoginDto> {
    const user = await this.userRepository.findOne({ where: { user_name: userName } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      userName: user.user_name,
      password: user.password,
      role: user.role,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getRequestUser(id: number): Promise<ResponseUserDTO[]> {
    try {
      const followerIds = await this.requestService.getPendingRequests(id);

      if (followerIds.length === 0) {
        return [];
      }

      const followers = await this.userRepository
        .createQueryBuilder('user')
        .select(['user.id AS id', 'user.full_name AS full_name ', 'user.avatar AS avatar'])
        .where('user.id IN (:...ids)', { ids: followerIds })
        .getRawMany();

      return followers.map((follower) => this.mapToResponseUserDTO(follower));
    } catch (error) {
      throw new HttpException('Failed to fetch followers', error);
    }
  }

  async getAllFriends(id: number): Promise<ResponseUserDTO[]> {
    try {
      const friendIds = await this.requestService.getAcceptedRequests(id);
      if (friendIds.length === 0) {
        return [];
      }
      const friends = await this.userRepository
        .createQueryBuilder('user')
        .select(['user.id AS id', 'user.full_name AS full_name', 'user.avatar AS avatar'])
        .where('user.id IN (:...ids)', { ids: friendIds })
        .getRawMany();
      const ResponseUserDTOs = friends.map((user) => this.mapToResponseUserDTO(user));
      return ResponseUserDTOs;
    } catch (error) {
      throw new HttpException('Fail to fetch friend', error);
    }
  }

  async getInfOfUser(id: number): Promise<ResponseUserDTO> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const InfUser = {
        id: user.id,
        fullName: user.full_name,
        avatar: user.avatar,
      };
      return InfUser;
    } catch (err) {
      console.log('err');
      throw new Error(err);
    }
  }

  mapToResponseUserDTO(user: User): ResponseUserDTO {
    return {
      id: user.id,
      fullName: user.full_name,
      userName: user.user_name,
      email: user.email,
      avatar: user.avatar,
      phoneNumber: user.phone_number,
      gender: user.gender,
      role: user.role,
      status: user.status,
    };
  }

  async mapToCreateUserDTO(createUserDto: CreateUserDto): Promise<User> {
    const {
      fullName,
      userName,
      dateOfBirth,
      email,
      phoneNumber,
      role,
      gender,
      password,
      avatar,
      cover,
      biography,
      facebook,
      instagram,
    } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { user_name: userName }, { phone_number: phoneNumber }],
    });
    if (existingUser) {
      switch (true) {
        case existingUser.email === email:
          throw new HttpException(
            { status: HttpStatus.BAD_REQUEST, error: 'Email already exists' },
            HttpStatus.BAD_REQUEST,
          );
        case existingUser.user_name === userName:
          throw new HttpException(
            { status: HttpStatus.BAD_REQUEST, error: 'Username already exists' },
            HttpStatus.BAD_REQUEST,
          );
        case existingUser.phone_number === phoneNumber:
          throw new HttpException(
            { status: HttpStatus.BAD_REQUEST, error: 'Phone number already exists' },
            HttpStatus.BAD_REQUEST,
          );
        default:
          break;
      }
    }
    const newUser = new User();
    newUser.user_name = userName;
    newUser.full_name = fullName;
    newUser.email = email;
    newUser.phone_number = phoneNumber || null;
    newUser.date_of_birth = dateOfBirth || null;
    newUser.role = role;
    newUser.gender = gender;
    newUser.password = password;
    newUser.avatar = avatar || null;
    newUser.cover = cover || null;
    newUser.biography = biography || null;
    newUser.facebook = facebook || null;
    newUser.instagram = instagram || null;
    return newUser;
  }

  async searchUsers(q: string): Promise<ResponseUserDTO[]> {
    const users = await this.userRepository.find({
      where: [
        { full_name: Like(`%${q}%`) },
        { user_name: Like(`%${q}%`) },
        { email: Like(`%${q}%`) },
      ],
    });

    if (users.length === 0 || !users) {
      return [];
    }
    return users.map((user) => this.mapToResponseUserDTO(user));
  }
}
