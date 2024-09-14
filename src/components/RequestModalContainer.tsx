import { Modal, Input, ModalHeader, ModalBody } from "@nextui-org/react";
import { Fragment, ReactNode } from "react";

/**
 * Types
 */
interface IProps {
    title?: string;
    children: ReactNode | ReactNode[];
}

/**
 * Component
 */
export default function RequestModalContainer({ children, title }: IProps) {
    return (
        <Fragment>
            {title ? (
                <ModalHeader>
                    <Input defaultValue={title} />
                </ModalHeader>
            ) : null}
            <ModalBody>
                <div style={{ padding: 0 }}>{children}</div>
            </ModalBody>
        </Fragment>
    );
}
