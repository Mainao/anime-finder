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
            className="flex items-center gap-3 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-sm cursor-pointer text-white/60"
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <span className="text-xs md:text-sm">
                Search an anime by uploading an image
            </span>
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
