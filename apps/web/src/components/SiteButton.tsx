import { motion, type HTMLMotionProps } from 'framer-motion';

type SiteButtonProps = {
  variant?: 'solid' | 'outline-dark' | 'outline-light';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
} & Omit<HTMLMotionProps<'a'>, 'href' | 'onClick' | 'children'>;

const BASE =
  'inline-flex items-center justify-center px-8 py-3 min-h-[48px] rounded-xl font-medium tracking-wide ' +
  'transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.99] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

const VARIANTS: Record<NonNullable<SiteButtonProps['variant']>, string> = {
  solid: 'bg-rc-accent text-white shadow-md hover:shadow-xl hover:bg-rc-accent-light focus-visible:outline-rc-accent',
  'outline-dark': 'text-rc-text border-2 border-rc-text hover:bg-rc-text/5 focus-visible:outline-rc-text',
  'outline-light': 'text-white border-2 border-white hover:bg-white/10 hover:shadow-[0_0_24px_rgba(255,255,255,0.15)] focus-visible:outline-white',
};

/** Single source of truth for every CTA on the site — solid teal for primary actions,
 *  outline for secondary/on-dark actions. Never copy-paste button classes into a page again. */
export default function SiteButton({ variant = 'solid', href, onClick, children, className = '', ...rest }: SiteButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <motion.a href={href} className={classes} {...rest}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.a onClick={onClick} role="button" tabIndex={0} className={`${classes} cursor-pointer`} {...rest}>
      {children}
    </motion.a>
  );
}
