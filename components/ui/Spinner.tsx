import Image from "next/image";

type Props = {
    className?: string;
    size?: number;
};

export default function LoadingSpinner({ className = "", size = 100 }: Props) {
    return (
        <div className={`flex justify-center items-center ${className}`}>
            <Image
                src="/icons/kaomoji.gif"
                alt="Loading spinner"
                width={size}
                height={size}
            />
        </div>
    );
}
