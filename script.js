/* =====================================================
   DAILY VERSE APPLICATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTS
    ================================================= */

    const startScreen =
        document.getElementById("start-screen");

    const verseScreen =
        document.getElementById("verse-screen");

    const firstBackground =
        document.getElementById("firstBackground");

    const dailyBackground =
        document.getElementById("dailyBackground");

    const bibleImage =
        document.getElementById("bibleImage");

    const tamilReference =
        document.getElementById("tamilReference");

    const tamilVerse =
        document.getElementById("tamilVerse");

    const englishReference =
        document.getElementById("englishReference");

    const englishVerse =
        document.getElementById("englishVerse");

    const prayerTitle =
        document.getElementById("prayerTitle");

    const prayerDescription =
        document.getElementById("prayerDescription");

    const prayerDate =
        document.getElementById("prayerDate");

    const prayerTime =
        document.getElementById("prayerTime");

    const prayerPlace =
        document.getElementById("prayerPlace");

    const amenBtn =
        document.getElementById("amenBtn");

    const blessing =
        document.getElementById("blessing");

    const goldenGlow =
        document.getElementById("golden-glow");

    const bottomFlashContainer =
        document.getElementById(
            "bottom-flash-container"
        );

    const amenFlashContainer =
        document.getElementById(
            "amen-flash-container"
        );


    /* =================================================
       SAFETY CHECK
    ================================================= */

    if (
        !startScreen ||
        !verseScreen ||
        !dailyVerses
    ) {

        console.error(
            "Daily Verse: Required elements are missing."
        );

        return;
    }


    /* =================================================
       SCREEN CHANGE LOCK
       
       Prevents multiple taps from triggering
       the transition repeatedly.
    ================================================= */

    let screenChanging = false;


    /* =================================================
       GET CURRENT DAY
    ================================================= */

    const today =
        new Date();

    const currentDay =
        today.getDate();


    /* =================================================
       GET TODAY'S DATA
    ================================================= */

    const todayVerse =
        dailyVerses[currentDay]
        || dailyVerses[1];


    /* =================================================
       LOAD DAILY CONTENT
    ================================================= */

    function loadDailyContent() {

        /* ---------------------------------------------
           BIBLE IMAGE
        --------------------------------------------- */

        if (
            bibleImage &&
            todayVerse.bibleImage
        ) {

            bibleImage.src =
                todayVerse.bibleImage;

        }


        /* ---------------------------------------------
           FIRST SCREEN BACKGROUND
        --------------------------------------------- */

        if (
            firstBackground &&
            todayVerse.backgroundImage
        ) {

            firstBackground.style.backgroundImage =
                `url("${todayVerse.backgroundImage}")`;

        }


        /* ---------------------------------------------
           SECOND SCREEN BACKGROUND
        --------------------------------------------- */

        if (
            dailyBackground &&
            todayVerse.backgroundImage
        ) {

            dailyBackground.style.backgroundImage =
                `url("${todayVerse.backgroundImage}")`;

        }


        /* ---------------------------------------------
           TAMIL REFERENCE
        --------------------------------------------- */

        if (tamilReference) {

            tamilReference.textContent =
                todayVerse.tamilReference
                || "";

        }


        /* ---------------------------------------------
           TAMIL VERSE
        --------------------------------------------- */

        if (tamilVerse) {

            tamilVerse.textContent =
                todayVerse.tamilVerse
                || "";

        }


        /* ---------------------------------------------
           ENGLISH REFERENCE
        --------------------------------------------- */

        if (englishReference) {

            englishReference.textContent =
                todayVerse.englishReference
                || "";

        }


        /* ---------------------------------------------
           ENGLISH VERSE
        --------------------------------------------- */

        if (englishVerse) {

            englishVerse.textContent =
                todayVerse.englishVerse
                || "";

        }


        /* ---------------------------------------------
           PRAYER
        --------------------------------------------- */

        if (todayVerse.prayer) {

            if (prayerTitle) {

                prayerTitle.textContent =
                    todayVerse.prayer.title
                    || "";

            }


            if (prayerDescription) {

                prayerDescription.textContent =
                    todayVerse.prayer.description
                    || "";

            }


            if (prayerDate) {

                prayerDate.textContent =
                    todayVerse.prayer.date
                    || "";

            }


            if (prayerTime) {

                prayerTime.textContent =
                    todayVerse.prayer.time
                    || "";

            }


            if (prayerPlace) {

                prayerPlace.textContent =
                    todayVerse.prayer.place
                    || "";

            }

        }

    }


    /* =================================================
       LOAD CONTENT
    ================================================= */

    loadDailyContent();


    /* =================================================
       OPEN VERSE SCREEN
    ================================================= */

    function openVerseScreen() {

        /* ---------------------------------------------
           PREVENT REPEATED TAPS
        --------------------------------------------- */

        if (screenChanging) {

            return;

        }


        /* ---------------------------------------------
           IF ALREADY OPEN, STOP
        --------------------------------------------- */

        if (
            verseScreen.classList.contains("active")
        ) {

            return;

        }


        /* ---------------------------------------------
           LOCK
        --------------------------------------------- */

        screenChanging = true;


        /* ---------------------------------------------
           CREATE BOTTOM FLASH
           AT THE SAME TIME AS SCREEN TRANSITION
        --------------------------------------------- */

        createBottomFlash();


        /* ---------------------------------------------
           GOLDEN GLOW
        --------------------------------------------- */

        if (goldenGlow) {

            goldenGlow.classList.add("show");

            setTimeout(() => {

                goldenGlow.classList.remove("show");

            }, 700);

        }


        /* ---------------------------------------------
           SHOW BLESSING BAR
        --------------------------------------------- */

        if (blessing) {

            blessing.classList.add("show");

        }


        /* ---------------------------------------------
           START SCREEN OUT
        --------------------------------------------- */

        startScreen.classList.add("hide");


        /* ---------------------------------------------
           SECOND SCREEN IN
        --------------------------------------------- */

        verseScreen.classList.add("active");


        /* ---------------------------------------------
           RELEASE LOCK
        --------------------------------------------- */

        setTimeout(() => {

            screenChanging = false;

        }, 900);

    }


    /* =================================================
       FIRST SCREEN MOBILE + DESKTOP TAP
       
       IMPORTANT:
       pointerup works for:
       - mouse
       - touch
       - stylus
    ================================================= */

    startScreen.addEventListener(
        "pointerup",
        (event) => {

            /* -----------------------------------------
               Only primary pointer
            ----------------------------------------- */

            if (
                event.isPrimary === false
            ) {

                return;

            }


            /* -----------------------------------------
               Don't allow browser selection
            ----------------------------------------- */

            event.preventDefault();


            openVerseScreen();

        },
        {
            passive: false
        }
    );


    /* =================================================
       PREVENT CONTEXT MENU ON LONG PRESS
    ================================================= */

    startScreen.addEventListener(
        "contextmenu",
        (event) => {

            event.preventDefault();

        }
    );


    /* =================================================
       AMEN BUTTON
    ================================================= */

    if (amenBtn) {

        amenBtn.addEventListener(
            "pointerup",
            (event) => {

                event.preventDefault();

                event.stopPropagation();


                /* -------------------------------------
                   AMEN FLASH
                ------------------------------------- */

                createAmenFlash();

            },
            {
                passive: false
            }
        );

    }


    /* =================================================
       BOTTOM FLASH
       
       Used when opening the second screen.
    ================================================= */

    function createBottomFlash() {

        if (!bottomFlashContainer) {

            return;

        }


        const icons = [
            "💛",
            "✨",
            "✝️",
            "🙏",
            "💫",
            "🌟"
        ];


        /* ---------------------------------------------
           Create 16 icons
        --------------------------------------------- */

        for (
            let i = 0;
            i < 16;
            i++
        ) {

            const icon =
                document.createElement("span");


            icon.className =
                "bottom-flash-icon";


            icon.textContent =
                icons[
                    Math.floor(
                        Math.random() *
                        icons.length
                    )
                ];


            /* -----------------------------------------
               Random horizontal starting position
            ----------------------------------------- */

            const startX =
                (Math.random() - 0.5) *
                window.innerWidth *
                0.9;


            /* -----------------------------------------
               Random horizontal ending position
            ----------------------------------------- */

            const endX =
                (Math.random() - 0.5) *
                window.innerWidth *
                1.2;


            /* -----------------------------------------
               Random rotation
            ----------------------------------------- */

            const rotate =
                (Math.random() - 0.5) *
                180;


            icon.style.setProperty(
                "--start-x",
                `${startX}px`
            );


            icon.style.setProperty(
                "--end-x",
                `${endX}px`
            );


            icon.style.setProperty(
                "--rotate",
                `${rotate}deg`
            );


            /* -----------------------------------------
               Different timing
            ----------------------------------------- */

            icon.style.animationDelay =
                `${Math.random() * 0.45}s`;


            bottomFlashContainer.appendChild(
                icon
            );


            /* -----------------------------------------
               Remove
            ----------------------------------------- */

            setTimeout(() => {

                icon.remove();

            }, 2400);

        }

    }


    /* =================================================
       AMEN FLASH
       
       Creates BOTH:
       
       1. Center explosion
       2. Bottom flying icons
    ================================================= */

    function createAmenFlash() {

        if (!amenFlashContainer) {

            return;

        }


        const icons = [
            "💛",
            "✨",
            "✝️",
            "🙏",
            "💫",
            "🌟"
        ];


        /* =================================================
           CENTER FLASH
        ================================================= */

        for (
            let i = 0;
            i < 14;
            i++
        ) {

            const icon =
                document.createElement("span");


            icon.className =
                "amen-center-icon";


            icon.textContent =
                icons[
                    Math.floor(
                        Math.random() *
                        icons.length
                    )
                ];


            /* -----------------------------------------
               Random direction
            ----------------------------------------- */

            const angle =
                Math.random() *
                Math.PI *
                2;


            const distance =
                70 +
                Math.random() *
                180;


            const x =
                Math.cos(angle) *
                distance;


            const y =
                Math.sin(angle) *
                distance;


            const rotate =
                (Math.random() - 0.5) *
                360;


            icon.style.setProperty(
                "--x",
                `${x}px`
            );


            icon.style.setProperty(
                "--y",
                `${y}px`
            );


            icon.style.setProperty(
                "--rotate",
                `${rotate}deg`
            );


            icon.style.animationDelay =
                `${Math.random() * 0.12}s`;


            amenFlashContainer.appendChild(
                icon
            );


            setTimeout(() => {

                icon.remove();

            }, 1500);

        }


        /* =================================================
           BOTTOM FLASH
        ================================================= */

        for (
            let i = 0;
            i < 10;
            i++
        ) {

            const icon =
                document.createElement("span");


            icon.className =
                "amen-bottom-icon";


            icon.textContent =
                icons[
                    Math.floor(
                        Math.random() *
                        icons.length
                    )
                ];


            const startX =
                (Math.random() - 0.5) *
                window.innerWidth *
                0.8;


            const endX =
                (Math.random() - 0.5) *
                window.innerWidth *
                1.1;


            const rotate =
                (Math.random() - 0.5) *
                180;


            icon.style.setProperty(
                "--start-x",
                `${startX}px`
            );


            icon.style.setProperty(
                "--end-x",
                `${endX}px`
            );


            icon.style.setProperty(
                "--rotate",
                `${rotate}deg`
            );


            icon.style.animationDelay =
                `${Math.random() * 0.25}s`;


            amenFlashContainer.appendChild(
                icon
            );


            setTimeout(() => {

                icon.remove();

            }, 2000);

        }


        /* =================================================
           GOLDEN GLOW
        ================================================= */

        if (goldenGlow) {

            goldenGlow.classList.add("show");


            setTimeout(() => {

                goldenGlow.classList.remove("show");

            }, 500);

        }

    }


    /* =================================================
       ESCAPE KEY
       
       Desktop only / optional
    ================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                verseScreen.classList.contains("active")
            ) {

                closeVerseScreen();

            }

        }
    );


    /* =================================================
       CLOSE VERSE SCREEN
    ================================================= */

    function closeVerseScreen() {

        screenChanging = true;


        /* ---------------------------------------------
           Hide second screen
        --------------------------------------------- */

        verseScreen.classList.remove(
            "active"
        );


        /* ---------------------------------------------
           Show first screen
        --------------------------------------------- */

        startScreen.classList.remove(
            "hide"
        );


        /* ---------------------------------------------
           Hide blessing bar
        --------------------------------------------- */

        if (blessing) {

            blessing.classList.remove(
                "show"
            );

        }


        setTimeout(() => {

            screenChanging = false;

        }, 900);

    }


    /* =================================================
       PRELOAD IMAGES
    ================================================= */

    function preloadImages() {

        Object.values(dailyVerses)
            .forEach((day) => {

                if (day.bibleImage) {

                    const image =
                        new Image();

                    image.src =
                        day.bibleImage;

                }


                if (day.backgroundImage) {

                    const background =
                        new Image();

                    background.src =
                        day.backgroundImage;

                }

            });

    }


    preloadImages();


    /* =================================================
       DEBUG MESSAGE
       
       Open browser console to verify.
    ================================================= */

    console.log(
        "Daily Verse loaded successfully."
    );

    console.log(
        "Today:",
        currentDay
    );

    console.log(
        "Today's verse:",
        todayVerse.tamilReference
    );

});