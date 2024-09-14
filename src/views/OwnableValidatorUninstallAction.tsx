import {
    TableColumn as Col,
    Divider,
    TableRow as Row,
    Input as Text,
    Button,
} from "@nextui-org/react";

import { useState } from "react";

export default function OwnableValidatorUninstallActions({
    accountAddress,
    chainId,
}: {
    accountAddress: string;
    chainId: string;
}) {
    const [isUninstalling, setUninstalling] = useState(false);

    const uninstall = async () => {
        setUninstalling(true);
        setUninstalling(false);
    };

    return (
        <div style={{ marginBottom: "$2" }}>
            <Text>Uninstall</Text>
            <div>
                <Text>Coming soon...</Text>
                <Button disabled onClick={uninstall}>
                    {isUninstalling ? (
                        <Button isLoading size="sm" />
                    ) : (
                        "Uninstall"
                    )}
                </Button>
            </div>
        </div>
    );
}
