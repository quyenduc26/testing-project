import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    const newAddress = await this.mapToAddressDTO(createAddressDto);
    const savedAddress = await this.addressRepository.save(newAddress);
    const ResponseAddressDTO = this.mapToAddressResponseDTO(savedAddress);
    return ResponseAddressDTO;
  }

  async findOne(id: number) {
    try {
      const foundAddress = await this.addressRepository.findOne({ where: { id: id } });
      if (!foundAddress) {
        throw new NotFoundException('Address not found');
      }
      const responseAddressDTO = this.mapToAddressResponseDTO(foundAddress);
      return responseAddressDTO;
    } catch (error) {
      throw error;
    }
  }
  async update(id: number, updateAddressDto: UpdateAddressDto) {
    try {
      const savedAddress = await this.mapToAddressDTO(updateAddressDto);
      const updateResult = await this.addressRepository.update(id, savedAddress);
      if (updateResult.affected === 0) {
        throw new NotFoundException(`Address with ID ${id} not found`);
      }
      const updatedAddress = await this.addressRepository.findOne({ where: { id: id } });
      if (!updatedAddress) {
        throw new NotFoundException(`Address with ID ${id} not found`);
      }
      const responseAddressDTO = this.mapToAddressResponseDTO(updatedAddress);
      return responseAddressDTO;
    } catch (error) {
      throw error;
    }
  }

  //  CONVERSION FUNCTION
  async mapToAddressDTO(AddressDto: CreateAddressDto | UpdateAddressDto): Promise<Address> {
    const { street, state, city, country, isDefault, userId } = AddressDto;
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newAddress = new Address();
    newAddress.street = street;
    newAddress.state = state;
    newAddress.city = city;
    newAddress.country = country;
    newAddress.user_id = userId;
    newAddress.is_default = isDefault;
    newAddress.user = user;
    return newAddress;
  }

  async mapToAddressResponseDTO(address: Address) {
    const user = await this.userRepository.findOne({
      where: { id: address.user_id },
      select: {
        id: true,
        user_name: true,
        avatar: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const ResponseAddressDTO = {
      id: address.id,
      street: address.street,
      state: address.state,
      city: address.city,
      country: address.country,
      userId: address.user_id,
      user: user,
    };
    return ResponseAddressDTO;
  }
}
