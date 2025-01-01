import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
  } from 'react'
import Image from 'next/image'
  
export const EmojiList = forwardRef((props:any, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    
    const selectItem = (index: any) => {
      const item:any = props.items[index]
  
      if (item) {
        props.command({ name: item.name })
      }
    }
    return (
        <div className="items relative">
            {
                props.items.map((item:any, index:number) => (
                    <button
                        className={`item ${index === selectedIndex ? 'is-selected' : ''} flex items-center`}
                        key={index}
                        onClick={() => selectItem(index)}
                    >
                        { 
                            item.fallbackImage
                                ? <Image alt="emoji" src={item.fallbackImage} className="w-4 h-4" width={20} height={20}/>
                                : item.emoji
                        }
                        : {
                            item.name
                        }
                    </button>
                ))
            }
        </div>
    )
  })