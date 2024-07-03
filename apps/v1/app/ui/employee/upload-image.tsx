'use client';

// import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useRef } from 'react';
 
export default function AvatarUploadPage({email}: {email: string}) {
    const inputFileRef = useRef<HTMLInputElement>(null);
    // const [blob, setBlob] = useState<PutBlobResult | null>(null);
    const handleUpload = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
        }

        const file = inputFileRef.current.files[0];

        upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/employee/create/upload',
            clientPayload: email
        });
        // setBlob(newBlob);
    }
  return (
    <>
      <h1>Upload Your Avatar</h1>
      
        <input
            // name="file"
            ref={inputFileRef}
            type="file" required
            title='upload file'
        />
         {/* Button to create */}
        <button 
            type="submit"
            onClick={(e) => handleUpload(e)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            Create
        </button>
    </>
  );
}