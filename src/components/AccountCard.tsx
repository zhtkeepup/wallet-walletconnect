import ChainCard from "@/components/ChainCard";
import SettingsStore from "@/store/SettingsStore";
import { eip155Addresses } from "@/utils/EIP155WalletUtil";
import { truncate } from "@/utils/HelperUtil";
import { updateSignClientChainId } from "@/utils/WalletConnectUtil";
import { Avatar, Button, Input, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

interface Props {
    name: string;
    logo: string;
    rgb: string;
    address: string;
    chainId: string;
}

export default function AccountCard({
    name,
    logo,
    rgb,
    address = "",
    chainId,
}: Props) {
    const [copied, setCopied] = useState(false);
    const { activeChainId, account } = useSnapshot(SettingsStore.state);
    console.log("zht,AccountCard,activeChainId:", activeChainId, account);
    function onCopy() {
        navigator?.clipboard?.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    async function onChainChanged(chainId: string, address: string) {
        SettingsStore.setActiveChainId(chainId);
        console.log(
            "zht,onChainChanged,updateSignClientChainId:",
            chainId,
            "*",
            address
        );
        await updateSignClientChainId(chainId.toString(), address);
    }

    useEffect(() => {
        onChainChanged(chainId, address);
    }, []);

    return (
        <ChainCard rgb={rgb} flexDirection="row" alignItems="center">
            <Avatar src={logo} />
            <div style={{ flex: 1 }}>
                <Input defaultValue={name} style={{ marginLeft: "$9" }} />

                <Input
                    defaultValue={
                        address
                            ? truncate(address, 19)
                            : "<no address available>"
                    }
                    weight="light"
                    size={13}
                    style={{ marginLeft: "$9" }}
                />
            </div>

            <Tooltip content={copied ? "Copied!" : "Copy"} placement="left">
                <Button
                    size="sm"
                    style={{
                        minWidth: "auto",
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                    }}
                    data-testid={"chain-copy-button" + chainId}
                    onClick={(e) => {
                        e.stopPropagation();
                        onCopy();
                    }}
                >
                    <Image
                        src={
                            copied
                                ? "/icons/checkmark-icon.svg"
                                : "/icons/copy-icon.svg"
                        }
                        width={15}
                        height={15}
                        alt="copy icon"
                    />
                </Button>
            </Tooltip>
            <Button
                size="sm"
                style={{
                    minWidth: "auto",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    marginLeft: "$5",
                }}
                data-testid={"chain-switch-button" + chainId}
                onClick={(e) => {
                    e.stopPropagation();
                    onChainChanged(chainId, address);
                }}
            >
                {activeChainId === chainId ? `✅` : `🔄`}
            </Button>
        </ChainCard>
    );
}
