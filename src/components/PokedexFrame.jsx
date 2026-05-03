import { useState, useEffect } from 'react'
import styles from './PokedexFrame.module.css'

export default function PokedexFrame({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [overlayDone, setOverlayDone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setIsOpen(true), 5000)
    const t2 = setTimeout(() => setOverlayDone(true), 6700)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.frame}>

        <div className={styles.topDecor}>
          <div className={styles.camera} />
          <div className={`${styles.lights} ${!isOpen ? styles.lightsLoading : ''}`}>
            <span className={`${styles.light} ${styles.lightRed}`} />
            <span className={`${styles.light} ${styles.lightYellow}`} />
            <span className={`${styles.light} ${styles.lightGreen}`} />
          </div>
          {!isOpen && <span className={styles.loadingText}>Loading...</span>}
        </div>

        <div className={`${styles.screen} ${isOpen ? styles.screenOpen : ''}`}>
          {children}
        </div>

        <div className={styles.bottomDecor}>
          <div className={styles.dpad} >
            <div className={styles.dpadH} />
            <div className={styles.dpadV} />
          </div>
          <div className={styles.speaker}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className={styles.speakerLine} />
            ))}
          </div>
          <div className={styles.actionBtns}>
            <span className={styles.btnA}>A</span>
            <span className={styles.btnB}>B</span>
          </div>
        </div>

        {/* ── Opening animation overlay — covers screen area only ── */}
        {!overlayDone && (
          <div className={`${styles.openOverlay} ${isOpen ? styles.overlayOpen : ''}`}>
            <div className={styles.panelTop}>
              <div className={styles.panelHinge} />
            </div>
            <div className={styles.panelBottom} />

            {/* Closed-state decoration: large ring + lens + small dot (Gold/Silver style) */}
            <div className={styles.closedDecor}>
              <div className={styles.closedRing}>
                <div className={styles.closedLens} />
              </div>
            </div>
            <div className={styles.closedDot} />
          </div>
        )}

      </div>
    </div>
  )
}
