import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new address' })
  create(@Body() createAddress: CreateAddressDto) {
    return this.addressService.create(createAddress);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an address' })
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an address' })
  updateAddress(@Param('id') idAddress: number, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(idAddress, updateAddressDto);
  }
}
