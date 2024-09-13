import SettingsStore from "@/store/SettingsStore";
import { Button, ModalFooter, Modal } from "@nextui-org/react";
import { useMemo } from "react";
import { useSnapshot } from "valtio";
export interface LoaderProps {
    color?:
        | "default"
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "error"
        | "white";
    active?: boolean;
}
interface Props {
    onApprove: () => void;
    onReject: () => void;
    infoBoxCondition?: boolean;
    infoBoxText?: string;
    approveLoader?: LoaderProps;
    rejectLoader?: LoaderProps;
    disableApprove?: boolean;
    disableReject?: boolean;
}

export default function Modalfooter({
    onApprove,
    approveLoader,
    onReject,
    rejectLoader,
    infoBoxCondition,
    infoBoxText,
    disableApprove,
    disableReject,
}: Props) {
    const { currentRequestVerifyContext } = useSnapshot(SettingsStore.state);
    const validation = currentRequestVerifyContext?.verified.validation;

    const approveButtonColor: any = useMemo(() => {
        switch (validation) {
            case "INVALID":
                return "error";
            case "UNKNOWN":
                return "warning";
            default:
                return "success";
        }
    }, [validation]);

    return (
        <ModalFooter>
            889911
            {infoBoxCondition && (
                <div style={{ textAlign: "initial" }}>
                    <span>{infoBoxText || ""}</span>
                </div>
            )}
            <div>
                <Button
                    auto
                    flat
                    style={{ color: "white", backgroundColor: "grey" }}
                    onPress={onReject}
                    data-testid="session-reject-button"
                    disabled={disableReject || rejectLoader?.active}
                >
                    {rejectLoader && rejectLoader.active ? (
                        <Button
                            isLoading
                            size="md"
                            color={rejectLoader.color || "white"}
                        />
                    ) : (
                        "Reject"
                    )}
                </Button>
                <Button
                    auto
                    flat
                    color={approveButtonColor}
                    disabled={disableApprove || approveLoader?.active}
                    onPress={onApprove}
                    data-testid="session-approve-button"
                >
                    {approveLoader && approveLoader.active ? (
                        <Button
                            isLoading
                            size="md"
                            color={approveLoader.color || approveButtonColor}
                        />
                    ) : (
                        "Approve"
                    )}
                </Button>
            </div>
        </ModalFooter>
    );
}
