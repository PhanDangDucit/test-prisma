'use client'
import { gitHubEmojis } from "@tiptap-pro/extension-emoji";
import { Editor } from "@tiptap/react";
import Image from 'next/image';
// import { useState } from 'react';

const EmotionPopup = ({
    editor
}: {
    editor:Editor
}) => {
    return (
        <div className='bg-white border-gray-200 border-2 grid grid-cols-8 gap-2 overflow-auto h-[400px] w-96 p-3' tabIndex={0}>
            {
                gitHubEmojis && gitHubEmojis.map(
                    (emoji) => emoji.fallbackImage && (
                        <div
                            key={emoji.name}
                            onClick = {() => {
                                editor.chain().focus().setEmoji(`${emoji.name}`).run()
                            }}
                            className='w-8 h-8 relative  cursor-pointer z-10'
                            tabIndex={0}
                        >
                            <Image src={emoji.fallbackImage} width={20} height={20} alt='emoji-item' className='w-8 h-8'/>
                        </div>
                    )
                )
            }
        </div>
    );
}
 
export default EmotionPopup;