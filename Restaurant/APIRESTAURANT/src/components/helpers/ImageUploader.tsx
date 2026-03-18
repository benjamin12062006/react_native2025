import React from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface ImageUploaderProps {
    onUploadStart: () => void;
    onUploadError: (error: any) => void;
    onUploadSuccess: (url: string) => void;
    onProgress: (progress: number) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadStart, onUploadError, onUploadSuccess, onProgress }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const storage = getStorage();
            const storageRef = ref(storage, `productos/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            onUploadStart();

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    onProgress(progress);
                },
                (error) => onUploadError(error),
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    onUploadSuccess(downloadURL);
                }
            );
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Imagen</label>
            <input
                type="file"
                onChange={handleFileChange}
                className="shadow-lg appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            />
        </div>
    );
};

export default ImageUploader;
