// import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { PutBlobResult } from '@vercel/blob';
 
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const jsonResponse = await handleUpload({
        body,
        request,
        onBeforeGenerateToken: async (
            pathname,
            clientPayload
        ) => {
            return {
                allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
                tokenPayload: JSON.stringify({
                    pathname,
                    clientPayload
                }),
            };
        },
        onUploadCompleted: async ({
            blob, tokenPayload 
        } : {
            blob: PutBlobResult,
            tokenPayload?:string|null
        }) => {
            
            // try {
            //     if(typeof tokenPayload == 'string') {
            //         const { clientPayload } = JSON.parse(tokenPayload);
            //         const thumbnail = blob.url;
            //         await updatePostThumbnail(clientPayload, thumbnail);
            //     }
            // } catch (error) {
            //     throw new Error('Could not update user'+ error);
            // }
        },
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // The webhook will retry 5 times waiting for a 200
    );
  }
}