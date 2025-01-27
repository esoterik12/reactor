'use client'
import { useSelect, UseSelectStateChange } from 'downshift'
import clsx from 'clsx'
import DefaultButton from '../buttons/DefaultButton'
import IconChevronRight from '../icons/IconChevronRight'
import IconChevronLeft from '../icons/IconChevronLeft'

interface CustomDropdown {
  dropdownItems: string[]
  selectedItem: string | null
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>
  placeholder: string
  width?: string
}

type Direction = 'left' | 'right'

export function Dropdown({
  dropdownItems,
  selectedItem,
  setSelectedItem,
  placeholder,
  width = 'w-full'
}: CustomDropdown) {
  function itemToString(item: string | null) {
    return item ? item : ''
  }

  const handleSelectedItemChange = (changes: UseSelectStateChange<string>) => {
    const newSelectedItem = changes.selectedItem || null
    setSelectedItem(newSelectedItem)
  }

  function Select() {
    const {
      isOpen,
      getToggleButtonProps,
      getMenuProps,
      highlightedIndex,
      getItemProps
    } = useSelect({
      items: dropdownItems,
      itemToString,
      selectedItem,
      onSelectedItemChange: handleSelectedItemChange
    })

    const handleStudentScroll = (direction: Direction) => {
      const currentIndex = dropdownItems.findIndex(
        item => item === selectedItem
      )
      if (currentIndex === -1) {
        setSelectedItem(
          direction === 'left'
            ? dropdownItems[dropdownItems.length - 1]
            : dropdownItems[0]
        )
        return
      }

      let newIndex: number

      if (direction === 'right') {
        newIndex = (currentIndex + 1) % dropdownItems.length
      } else {
        newIndex =
          (currentIndex - 1 + dropdownItems.length) % dropdownItems.length
      }

      setSelectedItem(dropdownItems[newIndex])
    }

    return (
      <div className='page-background input-border flex flex-row items-center px-2'>
        <DefaultButton
          ariaLabel='Scroll left'
          handleClick={() => handleStudentScroll('left')}
          customClasses='mr-2'
        >
          <IconChevronLeft classes='h-6 w-6 muted-text transition-effect' />
        </DefaultButton>
        <div className='relative w-full'>
          {/* width is being passed as md:w-[XYZpx] */}
          <div className={`flex ${width} flex-col gap-1 rounded-xl`}>
            <div
              className='border-color transition-effect flex cursor-pointer justify-between rounded-lg p-1 hover:border-sky-200 focus:border-sky-500'
              {...getToggleButtonProps()}
            >
              {/* Sets the placeholder or shows the selected state*/}
              {selectedItem ? (
                <div className='flex w-full flex-row justify-between'>
                  <p>
                    {selectedItem !== 'None' && 'Level '}
                    {selectedItem}
                  </p>
                </div>
              ) : (
                <p className='muted-text'>{placeholder}</p>
              )}
              {/* Dropdown arrows */}
              <span className='px-2'>{isOpen ? '▲' : '▼'}</span>
            </div>
          </div>

          {/* Dropdown Menu */}
          <ul
            className={clsx(
              'custom-background border-color absolute z-10 mt-1 max-h-80 w-full overflow-auto rounded-lg border p-0 shadow-sm',
              !isOpen && 'hidden'
            )}
            {...getMenuProps()}
          >
            {isOpen &&
              dropdownItems.map((item, index) => (
                <li
                  className={`${highlightedIndex === index ? 'primary-background text-zinc-300' : 'page-background'} flex flex-col px-3 py-1 shadow-sm hover:cursor-pointer`}
                  key={item}
                  {...getItemProps({ item, index })}
                >
                                    <p>
                    {item !== 'None' && 'Level '}
                    {item}
                  </p>
                </li>
              ))}
          </ul>
        </div>
        <DefaultButton
          ariaLabel='Scroll right'
          handleClick={() => handleStudentScroll('right')}
          customClasses='ml-2'
        >
          <IconChevronRight classes='h-6 w-6 muted-text transition-effect' />
        </DefaultButton>
      </div>
    )
  }

  return <Select />
}
