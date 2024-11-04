import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Request } from './entities/request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(request: CreateRequestDto) {
    const user = await this.userRepository.findOne({ where: { id: request.userId } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const follower = await this.userRepository.findOne({ where: { id: request.followerId } });
    if (!follower) {
      throw new HttpException('Follower not found', HttpStatus.NOT_FOUND);
    }

    if (request.followerId == request.userId) {
      throw new BadRequestException('Can not follow yourself');
    }

    const oldRequest = await this.requestRepository.findOne({
      where: [
        { user_id: request.userId, follower_id: request.followerId },
        { user_id: request.followerId, follower_id: request.userId },
      ],
    });

    if (oldRequest) {
      throw new BadRequestException('Request already exists');
    }

    const newRequest = this.mapToRequestEntity(request);
    await this.requestRepository.save(newRequest);
    return newRequest;
  }

  async getPendingRequests(id: number) {
    const pendingUsers = await this.requestRepository.find({
      where: { user_id: id, status: 0 },
      select: ['follower_id'],
    });
    return pendingUsers.map((user) => user.follower_id);
  }

  async getAcceptedRequests(id: number) {
    const data = await this.requestRepository.find({
      where: [
        { user_id: id, status: 1 },
        { follower_id: id, status: 1 },
      ],
      select: ['user_id', 'follower_id'],
    });
    const ids = data.map((element) =>
      element.user_id != id ? element.user_id : element.follower_id,
    );
    return ids;
  }

  async update(userId: number, followerId: number): Promise<void> {
    const request = await this.requestRepository.findOne({
      where: { user_id: userId, follower_id: followerId },
    });

    if (!request) {
      throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
    }
    request.status = 1;
    await this.requestRepository.save(request);
  }

  async remove(userId: number, followerId: number) {
    const request = await this.requestRepository.findOne({
      where: { user_id: userId, follower_id: followerId },
    });

    if (!request) {
      throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
    }
    await this.requestRepository.remove(request);
  }

  mapToRequestEntity(request: CreateRequestDto) {
    const newRequest = new Request();
    newRequest.user_id = request.userId;
    newRequest.follower_id = request.followerId;
    return newRequest;
  }
}
