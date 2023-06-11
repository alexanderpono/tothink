import { UserProfileRepository } from "./UserProfileRepository";

export class UserProfileService {
    private readonly userProfileRepository: UserProfileRepository =
        new UserProfileRepository();

    public async getUserProfile(): Promise<any> {
        return await this.userProfileRepository.getUserProfile();
    }
}