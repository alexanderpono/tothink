import { UserProfilService } from "./UserProfilService";
import { TariffService } from "./TariffService";

export class UserPageController {

    public userProfile: any = {};
    public insuranceCases: any[] = [];
    public tariffs: any[] = [];
    public bestTariff: any = {};

    private readonly userProfilService: UserProfilService = new UserProfilService();
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
            this.userProfile = await this.userProfilService.getUserProfile();
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
