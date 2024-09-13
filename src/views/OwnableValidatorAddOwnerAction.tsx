import { manageERC7579Module } from "../utils/ERC7579AccountUtils";
import { styledToast } from "../utils/HelperUtil";

import {
    Button,
    TableRow as Row,
    TableColumn as Col,
    Input as Text,
    Input,
    Card,
    Textarea,
} from "@nextui-org/react";

import { useState } from "react";
import { isAddress } from "viem";
const { getAddOwnableValidatorOwnerAction } =
    require("@rhinestone/module-sdk") as typeof import("@rhinestone/module-sdk");

export default function OwnableValidatorAddOwnerAction({
    accountAddress,
    chainId,
    moduleState,
}: {
    accountAddress: string;
    chainId: string;
    moduleState?: { owners: string[]; threshold: number };
}) {
    const [newOwner, setNewOwner] = useState("");
    const [isAddingOwner, setAddingOwner] = useState(false);

    const addOwner = async () => {
        try {
            const ownerExists = moduleState?.owners?.some(
                (owner) => owner.toLowerCase() === newOwner.toLowerCase()
            );

            if (ownerExists) {
                styledToast("Owner already exists", "error");
                return;
            }
            setAddingOwner(true);
            const addOwnableValidatorOwnerAction =
                getAddOwnableValidatorOwnerAction({
                    owner: newOwner as `0x${string}`,
                });
            const txReceipt = await manageERC7579Module({
                accountAddress,
                chainId: chainId,
                executions: [addOwnableValidatorOwnerAction],
            });
            if (!txReceipt?.success) {
                styledToast(`Some error occurred`, "error");
            }

            styledToast(`Added owner Successfully`, "success");
        } catch (e) {
            console.error((e as Error).message);

            styledToast("Some error occurred", "error");
        }
        setAddingOwner(false);
    };

    return (
        <div
            style={{ marginBottom: "$2" }}
            // bordered
            // title={<Text h5>Add Owner</Text>}
        >
            <Col style={{ padding: "$5", paddingTop: 0 }}>
                <Row style={{ marginBottom: "$5" }}>
                    <Input
                        style={{ width: "100%" }}
                        value={newOwner}
                        label="Owner"
                        type="text"
                        onChange={(e) => setNewOwner(e.target.value)}
                        placeholder="add owner address"
                    />
                </Row>
                <Row style={{ display: "flex-end" }}>
                    <Button
                        disabled={!newOwner || !isAddress(newOwner)}
                        onClick={addOwner}
                    >
                        {isAddingOwner ? (
                            <Button color="success" size="sm" isLoading />
                        ) : (
                            "Add Owner"
                        )}
                    </Button>
                </Row>
            </Col>
        </div>
    );
}
