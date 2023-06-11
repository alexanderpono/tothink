import { TariffRepository } from "./TariffRepository";
import { TariffDto } from "./TariffDto";
import { UserProfileDto } from "./UserProfileDto";

export class TariffService {
    private readonly tarifRepository: TariffRepository = new TariffRepository();

    public async getTariffs(): Promise<TariffDto[]> {
        return await this.tarifRepository.getTariffs();
    }

    public async findBestTariff(userProfile: UserProfileDto): Promise<TariffDto | void> {
        const tariffs = await this.getTariffs();
        return tariffs.find((tarif: TariffDto) => {
            return tarif.ageFrom <= userProfile.getAge() &&
                userProfile.getAge() < tarif.ageTo;
        });
    }
}

