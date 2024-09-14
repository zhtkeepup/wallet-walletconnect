import ChainAddressMini from "./ChainAddressMini";
import { Button, Spinner, Input, Tooltip } from "@nextui-org/react";

type SmartAccount = {
    address: string;
    type: string;
};

interface Props {
    account: SmartAccount;
}

export default function ChainSmartAddressMini({ account }: Props) {
    if (!account) return <Spinner />;
    return (
        <div>
            <div>
                <Input
                    style={{ marginLeft: "5px" }}
                    defaultValue={account.type}
                />
                <ChainAddressMini address={account.address} />
            </div>
        </div>
    );
}
