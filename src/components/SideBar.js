import { useEffect, useState } from "react";
import {
    ArrowsPointingOutIcon,
    BackwardIcon,
    CpuChipIcon, EyeSlashIcon,
    ForwardIcon,
    MagnifyingGlassIcon, WrenchScrewdriverIcon
} from "@heroicons/react/20/solid";


// NavLink component
const NavLink = ({ ...props }) => {
    const {
        children,
        href = "",
        className = "",
        active = "",
        onClick = () => {},
    } = props;

    const [pathname, setPathname] = useState("/");

    const isActive = pathname === href;
    const activeClass = isActive ? active : "";

    useEffect(() => {
        setPathname(window.location.pathname);
    }, [props]);

    return (
        <a href={href} {...props} className={`${activeClass} ${className}`}>
            {children}
        </a>
    );
};

// Title component
const Title = ({ children }) => (
    <h3 className='pb-3 px-4 font-medium text-gray-800 md:px-8'>
        {children}
    </h3>
);

// Sections List
const SectionsList = ({ items }) => (
    <div className={ items[0].icon ? "text-gray-600 pt-4" : "text-gray-600 px-4 md:px-8"}>
        <ul>
            {items?.map((item, idx) => (
                <li key={idx}>
                    <NavLink
                        href={item?.href}
                        onClick={item?.onClick}
                        isActive={item.isActive}
                        active='text-gray-900 border-indigo-600'
                        className={item.isActive ? 'block w-full py-2 px-4 border-l text-gray-900 border-indigo-600 duration-150' : 'block w-full py-2 px-4 border-l hover:border-indigo-600 hover:text-gray-900 duration-150'}>
                        {item?.icon ? item?.icon : item?.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    </div>
);

// Search Box component
const SearchBox = ({ ...props }) => (
    <div className='relative w-full'>
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='w-5 h-5 text-gray-400 absolute left-3 inset-y-0 my-auto'>
            <path
                fillRule='evenodd'
                d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
                clipRule='evenodd'
            />
        </svg>

        <input
            {...props}
            type='email'
            className='w-full pl-12 pr-3 py-2 bg-white text-sm text-gray-500 bg-transparent outline-none border ring-blue-600 focus:ring-2 shadow-sm rounded-lg duration-200'
        />
    </div>
);


const Sidebar = (props) => {
    const items = {
        resolution : [
            { name: "640x360", onClick: () => {props.setHeight(360); props.setWidth(640)} },
            { name: "720x480", onClick: () => {props.setHeight(480); props.setWidth(720)}  },
            { name: "1280x720", onClick: () => {props.setHeight(750); props.setWidth(1280)}  },
            { name: "1920x1080", onClick: () => {props.setHeight(1080); props.setWidth(1920)} }],
        backward: [{ name: "5s", href: "javascript:void(0)" }, { name: "10s", href: "javascript:void(0)" }, { name: "30s", href: "javascript:void(0)" }, { name: "1mn", href: "javascript:void(0)" }, { name: "5mn", href: "javascript:void(0)" }],
        forward: [{ name: "5s", href: "javascript:void(0)" }, { name: "10s", href: "javascript:void(0)" }, { name: "30s", href: "javascript:void(0)" }, { name: "1mn", href: "javascript:void(0)" }, { name: "5mn", href: "javascript:void(0)" }],
        tools: [
            { isActive: props.isZoomed, icon: <MagnifyingGlassIcon className="h-6 w-6 hover:cursor-pointer" aria-hidden="true" onClick={event => props.setIsZoomed(!props.isZoomed)}/>},
            { icon: <EyeSlashIcon className="h-6 w-6 hover:cursor-pointer" aria-hidden="true" /> }]
    }

    return (
        <>
            <nav
                className="fixed z-40 top-0 left-0 w-full h-full border-r bg-white space-y-8 overflow-auto sm:w-40">
                <div className="sticky top-0 space-y-8 bg-white">
                    <div className='h-20 flex items-center px-4 md:px-8'>
                    </div>
                    {/*<div className='px-4 md:px-8'>*/}
                    {/*    <SearchBox placeholder='Search...' />*/}
                    {/*</div>*/}
                </div>
                <div className='text-[0.9rem] space-y-6'>
                    <>
                        <div>
                            <Title>
                                <WrenchScrewdriverIcon className="h-6 w-6" aria-hidden="true" />
                                <SectionsList items={items.tools} />
                            </Title>
                        </div>
                        <div>
                            <Title>
                                <ArrowsPointingOutIcon className="h-6 w-6" aria-hidden="true" />
                            </Title>
                            <SectionsList items={items.resolution} />
                        </div>
                        <div>
                            <Title>
                                <BackwardIcon className="h-6 w-6" aria-hidden="true" />
                            </Title>
                            <SectionsList items={items.backward} />
                        </div>
                        <div>
                            <Title>
                                <ForwardIcon className="h-6 w-6" aria-hidden="true" />
                            </Title>
                            <SectionsList items={items.forward} />
                        </div>
                    </>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;