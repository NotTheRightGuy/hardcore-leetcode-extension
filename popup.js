document
    .getElementById("toggleExtension")
    .addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: removeElements,
        });

        chrome.storage.local.set({ elementRemoved: true });

        const button = document.getElementById("toggleExtension");
        if (button.textContent === "Activate") {
            button.textContent = "Deactivate";
        } else {
            button.textContent = "Activate";
        }
    });

function getElementByXpath(path) {
    return document.evaluate(
        path,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
}

function removeElements() {
    const editorialTab = document.querySelector(
        'div[data-layout-path="/ts0/tb1"]'
    );
    const solutionTab = document.querySelector(
        'div[data-layout-path="/ts0/tb2"]'
    );
    const submissionTab = document.querySelector(
        'div[data-layout-path="/ts0/tb3"]'
    );

    const difficultyIcon = getElementByXpath(
        "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[2]/div[1]"
    );

    const solvedIcon = getElementByXpath(
        "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[1]/div[2]"
    );

    const topIconTab = getElementByXpath(
        "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[2]"
    );

    const bottomTabs = getElementByXpath(
        "/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[4]"
    );

    if (editorialTab) editorialTab.remove();
    if (solutionTab) solutionTab.remove();
    if (submissionTab) submissionTab.remove();
    if (difficultyIcon) difficultyIcon.remove();
    if (solvedIcon) solvedIcon.remove();
    if (topIconTab) topIconTab.remove();
    if (bottomTabs) bottomTabs.remove();
}
