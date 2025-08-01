import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/services/auth.service';
import { PrismaService } from '../../src/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: Partial<Record<string, any>>;
  let jwtService: Partial<Record<string, any>>;

  beforeEach(async () => {
    prisma = {
      access: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };
    jwtService = {
      signAsync: jest.fn().mockResolvedValue('token'),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return accessToken and expiresIn for valid credentials', async () => {
      const user = { id: 1, username: 'user', password: 'hashed' };
      prisma.access.findUnique.mockResolvedValue(user);
      jest.spyOn(require('../../src/common/Hash'), 'comparePasswords').mockResolvedValue(true);
      const result = await service.login('user', 'password');
      expect(result).toHaveProperty('accessToken', 'token');
      expect(result).toHaveProperty('expiresIn');
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      prisma.access.findUnique.mockResolvedValue(null);
      await expect(service.login('user', 'wrong')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('registerAccess', () => {
    it('should create a new access user', async () => {
      prisma.access.create.mockResolvedValue({});
      jest.spyOn(require('../../src/common/Hash'), 'hashPassword').mockResolvedValue('hashed');
      await expect(service.registerAccess('user', 'pass')).resolves.not.toThrow();
      expect(prisma.access.create).toHaveBeenCalledWith({
        data: { username: 'user', password: 'hashed' },
      });
    });
  });

  describe('findAccess', () => {
    it('should return user by username', async () => {
      prisma.access.findUnique.mockResolvedValue({ id: 1, username: 'user' });
      const result = await service.findAccess('user');
      expect(result).toEqual({ id: 1, username: 'user' });
    });
  });

  describe('findAccessById', () => {
    it('should return user by id', async () => {
      prisma.access.findUnique.mockResolvedValue({ id: 1, username: 'user' });
      const result = await service.findAccessById(1);
      expect(result).toEqual({ id: 1, username: 'user' });
    });
  });
});
