'use client'

import StarterKit from '@tiptap/starter-kit';
import FileHandler from '@tiptap-pro/extension-file-handler'
import Underline from '@tiptap/extension-underline';
import Text from '@tiptap/extension-text'
import Image from '@tiptap/extension-image'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import Blockquote from '@tiptap/extension-blockquote'
import ListItem from '@tiptap/extension-list-item'
import TextAlign from '@tiptap/extension-text-align'
import CodeBlock from '@tiptap/extension-code-block'
import OrderedList from '@tiptap/extension-ordered-list'
import Emoji, { gitHubEmojis } from '@tiptap-pro/extension-emoji'
import { suggestion } from './suggestion-editor.config';
import ImageResize from 'tiptap-extension-resize-image';

export const editorConfig =  {
    extensions: [
        StarterKit.configure({
            // history: false,
            bulletList: false,
            // strike: false,
            text:false,
            codeBlock:false,
            heading:false,
            listItem: false,
            orderedList:false,
            blockquote:false,
        }),
        Underline,
        ImageResize.configure({
          inline: true,
          HTMLAttributes: {
            class: 'border-2 border-orange-200 my-4 w-1/2 h-auto mx-auto',
          },
        }),
        Image.configure({
          inline: true,
          // allowBase64: true,
          HTMLAttributes: {
            class: 'border-2 border-orange-200 my-4 w-1/2 h-auto mx-auto',
          },
        }),
        ListItem,
        Text,
        Heading.configure({
          levels: [1, 2, 3, 4, 5],
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        BulletList.configure({
            itemTypeName: 'listItem',
            HTMLAttributes: {
                class: 'list-disc text-black text-xl2 pl-12',
            },
        }),
        OrderedList.configure({
          HTMLAttributes: {
            class: 'list-decimal text-black text-xl2 pl-12',
          },
        }),
        Blockquote.configure({
            HTMLAttributes: {
              class: 'border-l-500 border-l-2 bg-white p-5 w-1/2 mx-auto',
            },
        }),
        CodeBlock.configure({
            HTMLAttributes: {
              class: 'bg-gray-600 p-5 w-1/2 mx-auto text-white',
            },
        }),
        Emoji.configure({
          emojis: gitHubEmojis,
          // enableEmoticons: true,
          suggestion,
        }),
        FileHandler.configure({
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
            onDrop: (currentEditor, files, pos) => {
              files.forEach(file => {
                const fileReader = new FileReader()
                fileReader.readAsDataURL(file)
                fileReader.onload = () => {
                  currentEditor.chain().insertContentAt(pos, {
                    type: 'image',
                    attrs: {
                      src: fileReader.result,
                    },
                  }).focus().run()
                }
              })
            },
            onPaste: (currentEditor, files, htmlContent) => {
                files.forEach(file => {
                    if (htmlContent) {
                        // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
                        // you could extract the pasted file from this url string and upload it to a server for example
                        console.log(htmlContent) // eslint-disable-line no-console
                        return false
                    }
                    const fileReader = new FileReader()
                    fileReader.readAsDataURL(file)
                    fileReader.onload = () => {
                        currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                            type: 'image',
                            attrs: {
                              src: fileReader.result,
                            },
                        }).focus().run()
                    }
                })
            },
        }),
    ],
  editorProps: {
    attributes: {
        class: 'text-gray-600 m-5 focus:outline-none border-2 border-orange-100 min-h-[500px] p-2 bg-white',
    },
  },
}
