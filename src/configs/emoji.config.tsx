import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
  } from 'react'
import Image from 'next/image'
  
export const EmojiList = forwardRef((props:any, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    // console.log("selectedIndex:  ", selectedIndex)
    const selectItem = (index: any) => {
      const item:any = props.items[index]
  
      if (item) {
        props.command({ name: item.name })
      }
    }
  
    // const upHandler = () => {
    //   setSelectedIndex(((selectedIndex + props.items.length) - 1) % props.items.length)
    // }
  
    // const downHandler = () => {
    //   setSelectedIndex((selectedIndex + 1) % props.items.length)
    // }
  
    // const enterHandler = () => {
    //   selectItem(selectedIndex)
    // }
  
    // useEffect(() => setSelectedIndex(0), [props.items])
  
    // useImperativeHandle(ref, () => {
    //     return {
    //         onKeyDown: (x:any)=> {
    //             if (x.event.key === 'ArrowUp') {
    //                 upHandler()
    //                 return true
    //             }
    //             if (x.event.key === 'ArrowDown') {
    //                 downHandler()
    //                 return true
    //             }
    //             if (x.event.key === 'Enter') {
    //                 enterHandler()
    //                 return true
    //             }
    //             return false
    //         },
    //     }
    // }, [upHandler, downHandler, enterHandler])
  
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