import { JwtPayload } from './../auth/interfaces/jwt-payload';
import { UserRegisterDTO } from './../models/user-register.DTO';
import { JwtServiceMock } from './mocks/jwt.service.mock';
import { UserDTO } from './../models/user.DTO';
import { AuthService } from './../auth/auth.service';
import { UsersService } from './../users/user.service';

describe ('AuthService', () => {
    describe ('signIn method', () => {
        it ('should call usersService signIn method', async () => {
            // Arrange
            const jwtServiceMock = new JwtServiceMock({});
            const userService = new UsersService(null);
            const authService = new AuthService(jwtServiceMock, userService);
            const user = new UserDTO();

            jest.spyOn(userService, 'signIn').mockImplementation(() => {
                return user;
              });
            // Act
            await authService.signIn(user);
            // Assert
            expect(userService.signIn).toHaveBeenCalledTimes(1);
        });
    });
    it ('should call jwtService sign method if user is found', async () => {
        // Arrange
        const jwtServiceMock = new JwtServiceMock({});
        const userService = new UsersService(null);
        const authService = new AuthService(jwtServiceMock, userService);
        const user = new UserDTO();
        user.username = 'username';

        jest.spyOn(userService, 'signIn').mockImplementation(() => {
            return user;
          });
        jest.spyOn(jwtServiceMock, 'sign').mockImplementation(() => {
            return 'token';
          });

        // Act
        await authService.signIn(user);
        // Assert
        expect(jwtServiceMock.sign).toHaveBeenCalledTimes(1);
    });
    it ('should return result from jwtService sign method if user is found', async () => {
        // Arrange
        const jwtServiceMock = new JwtServiceMock({});
        const userService = new UsersService(null);
        const authService = new AuthService(jwtServiceMock, userService);
        const user = new UserDTO();
        user.username = 'username';

        jest.spyOn(userService, 'signIn').mockImplementation(() => {
            return user;
          });
        jest.spyOn(jwtServiceMock, 'sign').mockImplementation(() => {
            return 'token';
          });

        // Act
        const token = await authService.signIn(user);
        // Assert
        expect(token).toBe('token');
    });
    it ('should return null if user is not found', async () => {
        // Arrange
        const jwtServiceMock = new JwtServiceMock({});
        const userService = new UsersService(null);
        const authService = new AuthService(jwtServiceMock, userService);
        const user = new UserDTO();
        user.username = 'username';

        jest.spyOn(userService, 'signIn').mockImplementation(() => {
            return null;
          });
        jest.spyOn(jwtServiceMock, 'sign').mockImplementation(() => {
            return 'token';
          });

        // Act
        const token = await authService.signIn(user);
        // Assert
        expect(token).toBe(null);
    });
    describe ('validateUser method', () => {
        it('should call usersService validateUser method', async () => {
            // Arrange
            const jwtServiceMock = new JwtServiceMock({});
            const userService = new UsersService(null);
            const authService = new AuthService(jwtServiceMock, userService);
            const profile = new UserRegisterDTO();
            profile.username = 'username';
            jest.spyOn(userService, 'validateUser').mockImplementation(() => {
                return profile;
                });
            // Act
            await authService.validateUser({username: 'username'});
            // Assert
            expect(userService.validateUser).toHaveBeenCalledTimes(1);
        });
    });
    it('should return result from usersService validateUser method', async () => {
        // Arrange
        const jwtServiceMock = new JwtServiceMock({});
        const userService = new UsersService(null);
        const authService = new AuthService(jwtServiceMock, userService);
        const profile = new UserRegisterDTO();
        profile.username = 'username';
        jest.spyOn(userService, 'validateUser').mockImplementation(() => {
            return profile;
            });
        // Act
        const result = await authService.validateUser({username: 'username'});
        // Assert
        expect(result).toEqual(profile);
    });
});