import { UserProfileRepository } from "./UserProfileRepository";
import { UserProfileDto } from "./UserProfileDto";

export class UserProfileService {
    private readonly userProfileRepository: UserProfileRepository =
        new UserProfileRepository();

    public async getUserProfile(): Promise<UserProfileDto> {
        return await this.userProfileRepository.getUserProfile();
    }
}