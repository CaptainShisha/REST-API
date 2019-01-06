import { HttpStatus } from '@nestjs/common';
import { UserRegisterDTO } from './../models/user-register.DTO';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/user.service';
import { UserDTO } from '../models/user.DTO';

describe('AuthController', () => {
  describe('sign method', () => {
    it('should call AuthService signIn method', async () => {
    // Arrange
    const userService = new UsersService(null);
    const authenticationService = new AuthService(null, userService);
    const ctrl = new AuthController (authenticationService, userService);
    const user = new UserDTO();

    jest.spyOn(authenticationService, 'signIn').mockImplementation(() => {
      return 'token';
    });

    // Act
    await ctrl.sign(user);
    // Assert
    expect(authenticationService.signIn).toHaveBeenCalledTimes(1);
    // for service test expect(authenticationService.signIn).toReturnWith('token');
    });

    it('should throw when AuthService signIn method returns no token', async () => {
    // Arrange
    const userService = new UsersService(null);
    const authenticationService = new AuthService(null, userService);
    const ctrl = new AuthController (authenticationService, userService);
    const user = new UserDTO();
    jest.spyOn(authenticationService, 'signIn').mockImplementation(() => {
      return null;
    });
    // Act & Assert
    try {
      await ctrl.sign(user);
    } catch (e) {
      expect(e.message.message).toContain('Wrong credentials!');
    }
  });
    it('should return a stringified token', async () => {
    // Arrange
    const userService = new UsersService(null);
    const authenticationService = new AuthService(null, userService);
    const ctrl = new AuthController (authenticationService, userService);
    const user = new UserDTO();
    jest.spyOn(authenticationService, 'signIn').mockImplementation(() => {
      return 'token';
    });

    // Act
    const result = await ctrl.sign(user);
    // Assert
    expect(result).toEqual(JSON.stringify('token'));
  });
  });

  describe('getProfile method', () => {
    it('should call UserService getByUsername method', async () => {
      // Arrange
      const userService = new UsersService(null);
      const authenticationService = new AuthService(null, userService);
      const ctrl = new AuthController (authenticationService, userService);
      const user = new UserDTO();
      user.username = 'username';

      jest.spyOn(userService, 'getByUsername').mockImplementation(() => {
        return 'user';
      });

      // Act
      await ctrl.getProfile({user});
      // Assert
      expect(userService.getByUsername).toHaveBeenCalledTimes(1);
      });
    it('should return a user', async () => {
        // Arrange
        const userService = new UsersService(null);
        const authenticationService = new AuthService(null, userService);
        const ctrl = new AuthController (authenticationService, userService);
        const user = new UserDTO();
        user.username = 'username';
        const profile = new UserRegisterDTO();

        jest.spyOn(userService, 'getByUsername').mockImplementation(() => {
          return profile;
        });

        // Act
        const result = await ctrl.getProfile({user});
        // Assert
        expect(result).toEqual(profile);
        });
    });
  describe('deleteProfile method', () => {
      it('should call UserService deleteUser method', async () => {
        // Arrange
        const userService = new UsersService(null);
        const authenticationService = new AuthService(null, userService);
        const ctrl = new AuthController (authenticationService, userService);
        const user = new UserDTO();
        user.username = 'username';

        jest.spyOn(userService, 'deleteUser').mockImplementation(() => {
          return 'deleted';
        });

        // Act
        await ctrl.deleteProfile({user});
        // Assert
        expect(userService.deleteUser).toHaveBeenCalledTimes(1);
        });
      it('should return a success message if user is found', async () => {
          // Arrange
          const userService = new UsersService(null);
          const authenticationService = new AuthService(null, userService);
          const ctrl = new AuthController (authenticationService, userService);
          const user = new UserDTO();
          user.username = 'username';

          jest.spyOn(userService, 'deleteUser').mockImplementation(() => {
            return 'deleted';
          });
          // Act
          const result = await ctrl.deleteProfile({user});
          // Assert
          expect(result).toBe('deleted');
          });
      it('should throw if user is not found', async () => {
          // Arrange
          const userService = new UsersService(null);
          const authenticationService = new AuthService(null, userService);
          const ctrl = new AuthController (authenticationService, userService);
          const user = new UserDTO();
          user.username = 'username';
          jest.spyOn(userService, 'deleteUser').mockImplementation(() => {
            throw new Error('No such user!');
          });
          // Act & Assert
          try {
            await ctrl.deleteProfile({user});
          } catch (e) {
            expect(e.message).toContain('No such user!');
            expect(e.status).toBe(400);
          }
        });
    });
});
