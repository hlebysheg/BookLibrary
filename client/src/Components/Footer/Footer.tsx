import React from "react";
import FT from './Footer.module.scss';

export const Footer:React.FC = () => {
    return (
        <div className={FT.footer}>
            <a className={FT.link} href={'https://github.com/hlebysheg'}>Github</a>
            {/*<a className={FT.link} href={'https://vk.com/naruto_power'}>VK</a>*/}
        </div>
    )
}