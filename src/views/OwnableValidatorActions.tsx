import {
    Button,
    TableRow as Row,
    Input as Text,
    Card,
    Textarea,
} from "@nextui-org/react";

import { Fragment, useCallback, useEffect, useState } from "react";
import OwnableValidatorInstallAction from "./OwnableValidatorInstallAction";
import OwnableValidatorUninstallActions from "./OwnableValidatorUninstallAction";
import OwnableValidatorSetThresholdAction from "./OwnableValidatorSetThresholdAction";
import OwnableValidatorAddOwnerAction from "./OwnableValidatorAddOwnerAction";
import {
    getERC7579OwnableValidatorOwners,
    isERC7579ModuleInstalled,
} from "../utils/ERC7579AccountUtils";
import { Address } from "viem";
// import { RefreshOutlined } from "@material-ui/icons";
const { OWNABLE_VALIDATOR_ADDRESS } =
    require("@rhinestone/module-sdk") as typeof import("@rhinestone/module-sdk");
export default function OwnableValidatorActions({
    accountAddress,
    chainId,
}: {
    accountAddress: string;
    chainId: string;
}) {
    const [owners, setOwners] = useState<string[]>([]);
    const [threshold, setThreshold] = useState(0);
    const [isInstalled, setInstalled] = useState(false);
    const [isRefeshing, setRefreshing] = useState(false);
    const moduleType = "validator";
    const moduleAddress = OWNABLE_VALIDATOR_ADDRESS;

    const getModuleState = useCallback(async () => {
        const ownersPromise = getERC7579OwnableValidatorOwners({
            accountAddress,
            chainId,
        });
        const installationStatusPromise = isERC7579ModuleInstalled(
            accountAddress as Address,
            chainId,
            moduleType,
            moduleAddress
        );
        try {
            const [owners, isInstalledResult] = await Promise.all([
                ownersPromise,
                installationStatusPromise,
            ]);
            setOwners(owners);
            setInstalled(isInstalledResult);
        } catch (error) {
            console.error("Error fetching module state:", error);
        }
    }, [accountAddress, chainId, moduleAddress]);

    const onRefresh = async () => {
        setRefreshing(true);
        await getModuleState();
        setRefreshing(false);
    };

    useEffect(() => {
        getModuleState();
    }, [accountAddress, chainId, getModuleState, moduleAddress]);

    return (
        <Fragment>
            <div style={{ marginBottom: "$5" }}>
                <Text>Module Details</Text>
                <Button
                    size={"sm"}
                    // icon={!isRefeshing && <RefreshOutlined />}
                    onClick={onRefresh}
                >
                    {isRefeshing && <Button color="success" isLoading />}
                </Button>
            </div>
            <div style={{ marginBottom: "$5" }}>
                <Text>Status</Text>
                {isInstalled ? (
                    <Text color="success">Installed</Text>
                ) : (
                    <Text color="warning">Not Installed</Text>
                )}
            </div>
            {isInstalled && (
                <Fragment>
                    <Text style={{ marginBottom: "$5" }}>State</Text>
                    <div style={{ marginBottom: "$5" }}>
                        <div style={{ marginBottom: "$3" }}>
                            <Text>Current Threshold</Text>
                            <Text>{threshold}</Text>
                        </div>
                        <div style={{ marginBottom: "$5" }}>
                            <Text>{`Current Owner's Count`}</Text>
                            <Text>{owners.length}</Text>
                        </div>
                        <Textarea
                            label={`Owners Addresses`}
                            width="100%"
                            readOnly
                            minRows={3}
                            maxRows={3}
                            value={owners.join(",")}
                        />
                    </div>
                </Fragment>
            )}

            <Text style={{ marginBottom: "$5" }}>Available Actions</Text>
            <div>
                {!isInstalled ? (
                    <OwnableValidatorInstallAction
                        accountAddress={accountAddress}
                        chainId={chainId}
                    />
                ) : (
                    <Fragment>
                        <OwnableValidatorUninstallActions
                            accountAddress={accountAddress}
                            chainId={chainId}
                        />
                        <OwnableValidatorSetThresholdAction
                            accountAddress={accountAddress}
                            chainId={chainId}
                            moduleState={{ owners, threshold }}
                        />
                        <OwnableValidatorAddOwnerAction
                            accountAddress={accountAddress}
                            chainId={chainId}
                            moduleState={{ owners, threshold }}
                        />
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
}
