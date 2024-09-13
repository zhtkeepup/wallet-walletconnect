import {
    getERC7579OwnableValidatorOwners,
    manageERC7579Module,
} from "../utils/ERC7579AccountUtils";
import { styledToast } from "../utils/HelperUtil";
import {
    Button,
    TableRow as Row,
    TableCell,
    TableColumn as Col,
    Input as Text,
    Input,
    Card,
    Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
const { getSetOwnableValidatorThresholdAction } =
    require("@rhinestone/module-sdk") as typeof import("@rhinestone/module-sdk");

export default function OwnableValidatorSetThresholdAction({
    accountAddress,
    chainId,
    moduleState,
}: {
    accountAddress: string;
    chainId: string;
    moduleState?: { owners: string[]; threshold: number };
}) {
    const [threshold, setThreshold] = useState(0);
    const ownerCount = (moduleState?.owners || []).length;
    const [isUpdatingThreshold, setUpdatingThreshold] = useState(false);
    console.log({ moduleState });
    const updateThreshold = async () => {
        setUpdatingThreshold(true);
        try {
            const setOwnableValidatorThresholdAction =
                getSetOwnableValidatorThresholdAction({
                    threshold,
                });
            const txReceipt = await manageERC7579Module({
                accountAddress,
                chainId: chainId,
                executions: [setOwnableValidatorThresholdAction],
            });
            if (!txReceipt?.success) {
                styledToast(`Some error occurred`, "error");
            }

            styledToast(`Updated threshold Successfully`, "success");
        } catch (e) {
            console.error(e);
            styledToast((e as Error).message, "error");
        }
        setUpdatingThreshold(false);
    };

    return (
        <div
            style={{ marginBottom: "$2" }}
            title={<Text h5>Update threshold</Text>}
        >
            <Col style={{ padding: "$5", paddingTop: 0 }}>
                <Row
                    justify="space-between"
                    align="center"
                    style={{ marginBottom: "$5" }}
                >
                    <TableCell>
                        <Text
                            style={{ paddingLeft: "$2" }}
                        >{`Current Owner's Count `}</Text>
                        <Text>{ownerCount}</Text>
                    </TableCell>
                </Row>
                <Row style={{ marginBottom: "$5" }}>
                    <Input
                        style={{ width: "100%" }}
                        value={threshold.toString() || "0"}
                        label="Threshold"
                        type="number"
                        onChange={(e) => setThreshold(parseInt(e.target.value))}
                        placeholder="threshold"
                    />
                </Row>
                <Row>
                    <Button
                        disabled={
                            ownerCount === 0 ||
                            !threshold ||
                            threshold > ownerCount
                        }
                        onClick={updateThreshold}
                    >
                        {isUpdatingThreshold ? (
                            <Button isLoading size="sm" />
                        ) : (
                            "Update Threshold"
                        )}
                    </Button>
                </Row>
            </Col>
        </div>
    );
}
