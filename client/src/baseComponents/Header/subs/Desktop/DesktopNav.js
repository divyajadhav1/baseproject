import React, { useState } from 'react';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Div, NavBar, NavItem, SubNavContainer, SubNavItem } from 'basedesign-iswad';

import HeightTransitionEffect from '@/baseComponents/HeightTransitionEffect';

import { MENU_ITEMS, SUB_MENU_ITEMS } from '@/constants/menuItems';
import { setActiveMenu } from '@/reducers/general/activeMenu';
import { setActiveSubMenu } from '@/reducers/general/activeSubMenu';
import { AUTO_SCROLL_BEHAVIOR } from '@/constants/vars';

import styles from '../../Header.module.scss';

const DesktopNav = ({ changesThePage = true, isAppPage }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const activeMenu = useSelector((state) => state.activeMenu);
  const activeSubMenu = useSelector((state) => state.activeSubMenu);
  const homePageElements = useSelector((state) => state.homePageElements);
  const profile = useSelector((state) => state.profile);
  const curUserGroup = useSelector((state) => state.curUserGroup);

  const [hoveredSubMenu, setHoveredSubMenu] = useState('');

  return (
    <>
      <NavBar type="flex" className={cx('text-center transition1 HeaderMobNavContainerZIndex')}>
        {MENU_ITEMS?.map((item, idx) => {
          if (
            item?.showInDesktop &&
            ((!item?.allowedGroups?.length && !isAppPage) ||
              item?.allowedGroups?.includes(curUserGroup))
          ) {
            return (
              <NavItem
                key={idx}
                isActive={activeMenu === item.identifier}
                className={cx('m-r-16 mouse-hand pos-rel', styles.desktopNavItem)}
                activeClassName={'test'}
                onClick={() => {
                  if (!item?.hasSubMenu) {
                    dispatch(setActiveMenu(item.identifier));
                    dispatch(setActiveSubMenu(''));
                    if (changesThePage) {
                      router.push(item?.to);
                    } else {
                      homePageElements[item.identifier]?.scrollIntoView(AUTO_SCROLL_BEHAVIOR);
                    }
                  }
                }}
                onMouseOver={() => {
                  if (item?.hasSubMenu) {
                    setHoveredSubMenu(item.identifier);
                  }
                }}
                onMouseLeave={() => setHoveredSubMenu('')}>
                <Div
                  className={cx(
                    styles.desktopNavItemTitle,
                    activeMenu === item.identifier ? 'f-b' : ''
                  )}>
                  {item.title}
                </Div>
                {item?.hasSubMenu ? (
                  <HeightTransitionEffect
                    isActive={hoveredSubMenu === item.identifier}
                    className={cx('pos-abs z-10', styles.desktopNavItemSubNavContainer)}
                    style={{
                      left: `${item?.submenuTranslteX}` || '0px',
                      width: `${item?.subMenuWidth}` || '300px'
                    }}
                    onMouseOver={() => {
                      if (item?.hasSubMenu) {
                        setHoveredSubMenu(item.identifier);
                      }
                    }}
                    onMouseLeave={() => setHoveredSubMenu('')}>
                    {/* A Space between the header and submenu container */}
                    <Div style={{ height: '5px' }} />
                    {/* ------------------------------------------------- */}
                    <Div className={cx('', styles.desktopNavItemSubNavContainerMenu)}>
                      {SUB_MENU_ITEMS[item.identifier]?.map((subItem, subIdx) => (
                        <SubNavItem
                          className={cx(
                            'mouse-hand flex flex--jc--center',
                            activeMenu === item.identifier && activeSubMenu === subItem.identifier
                              ? 'f-b'
                              : ''
                          )}
                          key={subIdx}
                          isActive={
                            activeMenu === item.identifier && activeSubMenu === subItem.identifier
                          }>
                          <Div
                            className={cx(styles.desktopNavItemSubNavItemTitle)}
                            onClick={() => {
                              dispatch(setActiveMenu(item.identifier));
                              dispatch(setActiveSubMenu(subItem.identifier));
                              setHoveredSubMenu('');
                              if (changesThePage) {
                                router.push(subItem?.to);
                              } else {
                                homePageElements[subItem.identifier]?.scrollIntoView(
                                  AUTO_SCROLL_BEHAVIOR
                                );
                              }
                            }}>
                            {subItem.title}
                          </Div>
                        </SubNavItem>
                      ))}
                    </Div>
                  </HeightTransitionEffect>
                ) : (
                  ''
                )}
              </NavItem>
            );
          }
        })}
      </NavBar>
    </>
  );
};

export default DesktopNav;
