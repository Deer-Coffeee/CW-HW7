export interface UserFilePersistanceService {
    saveDataToFile():string;
    restoreDataFromFile():string;
}