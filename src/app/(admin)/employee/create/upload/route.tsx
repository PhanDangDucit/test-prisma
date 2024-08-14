// import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { updateAvatarEmployee } from '@/lib/data-employee';
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
            // Generate a client token for the browser to upload the file
            // ⚠️ Authenticate and authorize users before generating the token.
            // Otherwise, you're allowing anonymous uploads.
            // console.log("::::: ---------------------- :::::");
            // console.log("body:: ", body);
            // console.log("::::: ---------------------- :::::");
            // console.log("request:: ", request);
            // console.log("::::: ---------------------- :::::");
            // console.log("pathname:: ", pathname);
            // console.log("::::: ---------------------- :::::");
            // console.log("client payload:: ", clientPayload);
            // console.log("::::: ---------------------- :::::");
            return {
              allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
              tokenPayload: JSON.stringify({
                  pathname,//file.name
                  clientPayload
                  // optional, sent to your server on upload completion
                  // you could pass a user id from auth, or a value from clientPayload
              }),
            };
        },
        onUploadCompleted: async ({
          blob, tokenPayload 
        } : {
          blob: PutBlobResult,
          tokenPayload?:string|null
        }) => {
            // Get notified of client upload completion
            // ⚠️ This will not work on `localhost` websites,
            // Use ngrok or similar to get the full upload flow
    
            // console.log('blob upload completed', blob, tokenPayload);
            
            try {
              // console.log('blob upload completed', blob, tokenPayload);
              // console.log(typeof tokenPayload)
              // // Run any logic after the file upload completed
              if(typeof tokenPayload == 'string') {
                const { clientPayload } = JSON.parse(tokenPayload);
                const image_url = blob.url;
                await updateAvatarEmployee(clientPayload, image_url);
              }
              // // await db.update({ avatar: blob.url, userId });
            } catch (error) {
              throw new Error('Could not update user'+ error);
            }
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