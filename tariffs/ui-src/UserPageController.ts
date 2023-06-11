import { UserProfileService } from "./UserProfileService";
import { TariffService } from "./TariffService";
import { UserProfileDto } from "./UserProfileDto";
import { TariffDto } from "./TariffDto";

export class UserPageController {

    public userProfile: UserProfileDto = new UserProfileDto();
    public tariffs: TariffDto[] = [];
    public bestTariff: TariffDto | void = void 0;

    private readonly userProfileService: UserProfileService = new UserProfileService();
    private readonly tarifService: TariffService = new TariffService();
        
    constructor() {
        this.activate();
    }

    public async activate(): Promise<void> {
        await this.requestUserProfile();
        await this.requestTariffs();
    }

    public async requestUserProfile(): Promise<void> {
        try {
            this.userProfile = await this.userProfileService.getUserProfile();
            this.bestTariff = await this.tarifService.findBestTariff(this.userProfile);            
        } catch (e) {
            console.error(e);
        }
    }

    public async requestTariffs(): Promise<void> {
        try {
            this.tariffs = await this.tarifService.getTariffs();            
        } catch (e) {
            console.error(e);
        }
    }
}
