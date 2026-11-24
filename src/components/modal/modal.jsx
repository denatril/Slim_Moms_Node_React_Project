
import { useEffect, useRef } from 'react';
import styles from './modal.module.css';
import closeIcon from '../../images/cikis.svg';

export function Modal({ isOpen, onClose, children }) {
  const mobileCloseButtonRef = useRef(null);
  const desktopCloseButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    if (isMobile) {
      mobileCloseButtonRef.current?.focus();
    } else {
      desktopCloseButtonRef.current?.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className={styles.modalWindow}
        role="dialog"
        aria-modal="true"
        aria-label="Daily calorie intake"
      >
        {/* MOBILE HEADER BAR */}
        <div className={styles.mobileBar}>
          <button
            ref={mobileCloseButtonRef}
            type="button"
            className={styles.mobileCloseBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <img src={closeIcon} alt="" />
          </button>
        </div>

        {/* TABLET AND DESKTOP CLOSE BUTTON */}
        <button
          ref={desktopCloseButtonRef}
          type="button"
          className={styles.desktopCloseBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <div className={styles.modalContent}>
          {children}
        </div>
      </div>
    </div>
  );
}
