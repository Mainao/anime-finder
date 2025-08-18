type Props = {
    onDragOver: (e: React.DragEvent<HTMLLabelElement>) => void;
    onDragLeave: (e: React.DragEvent<HTMLLabelElement>) => void;
    onDrop: (e: React.DragEvent<HTMLLabelElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UploadBox({
    onDragOver,
    onDragLeave,
    onDrop,
    onChange,
}: Props) {
    return (
        <label
            htmlFor="upload"
            className="flex items-center gap-3 px-4 py-3 bg-[#2d333b] rounded-sm cursor-pointer text-white/60 hover:bg-white/10 transition"
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <span className="text-lg">🔍</span>
            <span className="text-xs md:text-sm">Upload an image</span>
            <input
                id="upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onChange}
            />
        </label>
    );
}
