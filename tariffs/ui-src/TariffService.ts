import { TariffRepository } from "./TariffRepository";

export class TariffService {
    private readonly tarifRepository: TariffRepository = new TariffRepository();

    public async getTariffs(): Promise<any> {
        return await this.tarifRepository.getTariffs();
    }

    public async findBestTariff(userProfile: any): Promise<any> {
        const tariffs = await this.getTariffs();
        return tariffs.find((tarif: any) => {
            return tarif.ageFrom <= userProfile.age &&
                userProfile.age < tarif.ageTo;
        });
    }
}

