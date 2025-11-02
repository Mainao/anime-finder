"use client";

import Image from "next/image";

export default function UploadPreview({previewImageUrl}: {previewImageUrl: string | null}) {
    return (
        <>
            <div className="md:w-1/3 space-y-4 mt-6">
                <div className="bg-neutral-900 rounded-2xl p-4">
                    <h2 className="text-gray-400 text-sm mb-2">Your search image</h2>
                    <div className="relative w-full h-48 md:h-64">
                        <Image
                        src={previewImageUrl!}
                        alt="Search"
                        fill
                        className="object-cover rounded-xl border border-neutral-700"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
