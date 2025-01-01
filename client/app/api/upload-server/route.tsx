import { Buffer } from 'node:buffer';
// Import necessary modules
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

// Define the POST handler for the file upload
export const POST = async (req:Request, res: Response) => {
  // Parse the incoming form data
  const formData = await req.formData();
  console.log("formdata:: ", formData);

  // Get the file from the form data
  const file = formData.get("file") as File;
  // Check if a file is received
  if (!file) {
    // If no file is received, return a JSON response with an error and a 400 status code
    return Response.json({ error: "No files received." }, { status: 400 });
  }
  // const fileSent = new File(file, name);
  console.log("file:: ", file);
  // Convert the file data to a Buffer
  // const buffer = Buffer.from(await file.arrayBuffer());
  const buffer = Buffer.from(await new Response(file).arrayBuffer());

  // Replace spaces in the file name with underscores
  const filename = file.name.replaceAll(" ", "_");
  console.log(filename);

  try {
    // Write the file to the specified directory (public/assets) with the modified filename
    await writeFile(
      path.join(process.cwd(), "public/assets/posts/images/" + filename),
      buffer
    );

    // Return a JSON response with a success message and a 201 status code
    return Response.json({ Message: "Success", status: 201 });
  } catch (error) {
    // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
    console.log("Error occurred ", error);
    return Response.json({ Message: "Failed", status: 500 });
  }
};