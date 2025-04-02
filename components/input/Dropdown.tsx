'use client'
import { useSelect, UseSelectStateChange } from 'downshift'
import clsx from 'clsx'

interface CustomDropdown {
  dropdownItems: string[]
  selectedItem: string | null
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>
  placeholder: string
  // Secondary state is added so a change to primary state can also reset the secondary state
  secondaryState?: string | null
  setSecondaryState?: React.Dispatch<React.SetStateAction<string | null>>
  prefix?: string
  width?: string
}

export function Dropdown({
  dropdownItems,
  selectedItem,
  setSelectedItem,
  placeholder,
  secondaryState,
  setSecondaryState,
  width = 'w-full',
  prefix = 'Level'
}: CustomDropdown) {
  function itemToString(item: string | null) {
    return item ? item : ''
  }

  const handleSelectedItemChange = (changes: UseSelectStateChange<string>) => {
    const newSelectedItem = changes.selectedItem || null

    if (secondaryState !== undefined && setSecondaryState) {
      setSecondaryState(null)
    }

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

    return (
      <div className='page-background input-border shadow-inset  flex flex-row items-center px-2'>
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
                    {selectedItem !== 'None' && `${prefix} `}
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
                    {item !== 'None' && `${prefix} `}
                    {item}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
  }

  return <Select />
}
