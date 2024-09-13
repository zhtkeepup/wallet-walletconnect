import SettingsStore from "@/store/SettingsStore";
import {
    createOrRestoreBiconomySmartAccount,
    createOrRestoreKernelSmartAccount,
    createOrRestoreSafeSmartAccount,
    smartAccountWallets,
} from "@/utils/SmartAccountUtil";

import { useSnapshot } from "valtio";

export default function useSmartAccounts() {
    const {
        smartAccountEnabled,
        kernelSmartAccountEnabled,
        safeSmartAccountEnabled,
        biconomySmartAccountEnabled,
    } = useSnapshot(SettingsStore.state);

    const initializeSmartAccounts = async (privateKey: string) => {
        if (smartAccountEnabled) {
            if (kernelSmartAccountEnabled) {
                const { kernelSmartAccountAddress } =
                    await createOrRestoreKernelSmartAccount(privateKey);
                SettingsStore.setKernelSmartAccountAddress(
                    kernelSmartAccountAddress
                );
            }
            if (safeSmartAccountEnabled) {
                const { safeSmartAccountAddress } =
                    await createOrRestoreSafeSmartAccount(privateKey);
                SettingsStore.setSafeSmartAccountAddress(
                    safeSmartAccountAddress
                );
            }
            if (biconomySmartAccountEnabled) {
                const { biconomySmartAccountAddress } =
                    await createOrRestoreBiconomySmartAccount(privateKey);
                SettingsStore.setBiconomySmartAccountAddress(
                    biconomySmartAccountAddress
                );
            }
        }
    };

    const getAvailableSmartAccounts = () => {
        if (!smartAccountEnabled) {
            return [];
        }
        const accounts = [];
        for (const [key, lib] of Object.entries(smartAccountWallets)) {
            accounts.push({
                address: key.split(":")[1],
                type: lib.type,
                chain: lib.chain,
            });
        }

        return accounts;
    };

    return {
        initializeSmartAccounts,
        getAvailableSmartAccounts,
    };
}
