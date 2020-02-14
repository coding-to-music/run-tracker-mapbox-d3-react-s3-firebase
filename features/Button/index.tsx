import React, { ReactNode, ComponentType, PropsWithChildren } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

interface Props {
  href?: string;
  disabled?: boolean;
  children: ReactNode;
}

const Wrapper = (Component, props: Props) => {
  const { href, children, disabled, ...rest } = props;
  const button = <Component {...{ disabled, ...rest }}>{children}</Component>;

  if (href) return <Link href={href}>{button}</Link>;
  return button;
};

export const Button = props => Wrapper(StyledButton, props);

export const DarkButtonLink = props => Wrapper(StyledDarkButton, props);

export const PrimaryButtonLink = props => Wrapper(StyledPrimaryButton, props);

const StyledLink = styled(Link)`
  display: flex;
  flex: none;
  align-items: center;
  outline: none;

  &:focus {
    outline: none;
    box-shadow: ${props => props.theme.boxShadow.outline};
  }
`;

const StyledButton = styled.button`
  display: flex;
  flex: none;
  align-items: center;
  outline: none;

  &:focus {
    outline: none;
    box-shadow: ${props => props.theme.boxShadow.outline};
  }
`;

const StyledDarkButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: none;
  border-radius: 2px;
  background-color: transparent;
  color: ${props => props.theme.colors.gray[400]};
  font-size: 1.4rem;

  &:hover {
    cursor: pointer;
    background-color: #071735;
    color: #fff;
  }
`;

const StyledPrimaryButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: none;
  border-radius: 2px;
  background-color: ${props => props.theme.colors.indigo[700]};
  color: #fff;
  font-size: 1.4rem;

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.indigo[600]};
  }

  &:active {
    background-color: ${props => props.theme.colors.indigo[800]};
  }
`;

export default Wrapper;