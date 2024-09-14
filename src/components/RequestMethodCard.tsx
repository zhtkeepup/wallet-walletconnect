import { Input } from "@nextui-org/react";

/**
 * Types
 */
interface IProps {
    methods: string[];
}

/**
 * Component
 */
export default function RequestMethodCard({ methods }: IProps) {
    return (
        <div>
            <div>
                <Input defaultValue="Methods" />
                <Input
                    defaultValue={methods.map((method) => method).join(", ")}
                    color="$gray400"
                    data-testid="request-methods"
                />
            </div>
        </div>
    );
}
