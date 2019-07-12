import React from 'react'
import './questionpages.css'
import {
    updateData,
    updateTalents,
    updatePassions,
    loadSelectionButtons,
    replaceImpactVerb,
    replaceStoryElement,
    loadDraft,
    loadFinalPurpose
} from './QuestionFunctions'


const StoryOne = () => (
    <div className="centered-div">
        <h3 className="section-title">Discover My Story</h3>
        <div className="d2-input">
            <div className="inline-text-block">I was born in </div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list year w-input" maxLength="256" name="birthYear" data-name="birthYear" placeholder="Year" id="birthYear" required="" />
            <div className="inline-text-block"> in</div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="birthTown" data-name="birthTown" placeholder="City" id="birthTown" required="" />
        </div>
        <div className="d2-input">
            <div className="inline-text-block">I grew up in a(n) </div>
            <select onChange={updateData.bind(this)} id="familyWealth" name="familyWealth" data-name="familyWealth" required="" className="d2-dropdown family-wealth-dropdown w-select">
                <option value="">Select one</option>
                <option value="Wealthy">Wealthy</option>
                <option value="Upper Middle Class">Upper Middle Class</option>
                <option value="Middle Class">Middle Class</option>
                <option value="Lower Middle Class">Lower Middle Class</option>
                <option value="Poor">Poor</option>
            </select>
            <div className="inline-text-block"> family</div>
        </div>
        <div className="d2-input">
            <div className="inline-text-block">I would describe the relationships within my immediate family as </div>
            <select onChange={updateData.bind(this)} id="familyDynamics" name="Family-Dynamics" data-name="Family Dynamics" required="" className="d2-dropdown family-dynamics-dropdown w-select">
                <option value="">Select one</option>
                <option value="Very Close">Very Close</option>
                <option value="Average">Average</option>
                <option value="Dysfunctional">Dysfunctional</option>
            </select>
        </div>
        <div className="d2-input">
            <div className="inline-text-block">Generally speaking, my immediate family was </div>
            <select onChange={updateData.bind(this)} id="familyHealth" name="Family-Health" data-name="Family Health" required="" className="d2-dropdown family-health-dropdown w-select">
                <option value="">Select one</option>
                <option value="Healthy">Healthy</option>
                <option value="Average">Average</option>
                <option value="Unhealthy">Unhealthy</option>
            </select>
        </ div>
    </div>
)

const StoryTwo = () => (
    <div className="centered-div">
        <h3 className="section-title">Discover My Story</h3>
        <div className="d2-input">
            <div className="inline-text-block">I attended </div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="college" data-name="college" placeholder="College" id="college" required="" />
            <div className="inline-text-block"> majoring in </div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="major" data-name="major" placeholder="Major" id="major" required="" />
        </div>
        <div className="d2-input">
            <div className="inline-text-block">I started my career in the </div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="industry" data-name="industry" placeholder="Industry" id="industry" required="" />
            <div className="inline-text-block"> industry as a(n) </div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="firstJob" data-name="firstJob" placeholder="Position" id="firstJob" required="" />
        </div>
        <div className="d2-input">
            <div className="inline-text-block">As a young child, I loved </div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="childLove" data-name="childLove" id="childLove" required="" />
        </div>
        <div className="d2-input">
            <div className="inline-text-block">I wanted to be a(n) </div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="childhoodDreamCareer" data-name="childhoodDreamCareer" placeholder="Career" id="childhoodDreamCareer" required="" />
            <div className="inline-text-block"> when I grew up</div>
        </div>
    </div>
)

const StoryThree = () => (
    <div className="centered-div">
        <h3 className="section-title">Discover My Story</h3>
        <div className="d2-input">
            <div className="inline-text-block">My mom inspired me by </div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="momInspiration" data-name="momInspiration" id="momInspiration" required="" />
        </div>
        <div className="d2-input">
            <div className="inline-text-block">She taught me </div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="momLesson" data-name="momLesson" id="momLesson" required="" />
        </div>
        <div className="d2-input">
            <div className="inline-text-block">My dad inspired me by </div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="dadInspiration" data-name="dadInspiration" id="dadInspiration" required="" />
        </div>
        <div className="d2-input">
            <div className="inline-text-block">He taught me </div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="dadLesson" data-name="dadLesson" id="dadLesson" required="" />
        </div>
        <div className="d2-input">
            <div className="inline-text-block">The most important lesson my parents taught me was </div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="parentsLesson" data-name="parentsLesson" id="parentsLesson" required="" />
        </div>
    </div >
)

const Formative = () => (
    <div className="centered-div">
        <h3 className="section-title">Formative Experiences</h3>
        <div className="d2-input">
            <div className="inline-text-block">The first life-altering, adult decision I made was </div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="adultDecision" data-name="adultDecision" id="adultDecision" required="" />
        </div>
        <div className="d2-input">
            <div className="inline-text-block">The most trying adversity I have faced was </div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="adversity" data-name="adversity" id="adversity" required="" />
        </div>
    </div >
)

const Talents = () => (
    <div className="centered-div">
        <h3 className="section-title">Talents</h3>
        <div className="talents-div">
            <div className="inline-text-block">I believe my top three God-given talents are </div>
            <input onChange={updateTalents} type="text" className="vertical-text-field-list w-input" maxLength="256" name="talent1" data-name="talent1" id="talent1" required="" />
            <input onChange={updateTalents} type="text" className="vertical-text-field-list w-input" maxLength="256" name="talent2" data-name="talent2" id="talent2" required="" />
            <input onChange={updateTalents} type="text" className="vertical-text-field-list w-input" maxLength="256" name="talent3" data-name="talent3" id="talent3" required="" />
        </div>
    </div >
)

const Capabilities = () => (
    <div className="centered-div">
        <h3 className="section-title">Capabilities</h3>
        <div className="d2-input">
            <div className="inline-text-block">I believe I am qualified to teach others about </div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="teaching" data-name="teaching" id="teaching" required="" />
        </div>
        <div className="d2-input">
            <div className="inline-text-block">I could improve myself in the area of </div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="improvement" data-name="improvement" id="improvement" required="" />
        </div>
    </div >
)

const Passions = () => (
    <div className="centered-div">
        <h3 className="section-title">Passions</h3>
        <div className="d2-input">
            <div className="inline-text-block">I feel the greatest amount of joy and energy when I am </div>
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="joy" data-name="joy" id="joy" required="" />
        </div>
        <div id="passionInputs" className="d2-input d2-input-list">
            <div className="inline-text-block">I am most passionate about </div>
            <input onChange={updatePassions} type="text" className="vertical-text-field-list w-input" maxLength="256" name="passion1" data-name="passion1" id="passion1" required="" />
            <input onChange={updatePassions} type="text" className="vertical-text-field-list w-input" maxLength="256" name="passion2" data-name="passion2" id="passion2" required="" />
            <input onChange={updatePassions} type="text" className="vertical-text-field-list w-input" maxLength="256" name="passion3" data-name="passion3" id="passion3" required="" />
        </div>
    </div >
)

const Philanthropy = () => (
    <div className="centered-div">
        <h3 className="section-title">Philanthropy</h3>
        <div className="talents-div">
            <div className="d2-input">
                <div className="inline-text-block">If I had unlimited resources, but I could only help one group of people or cause, I would help </div>
                <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list w-input" maxLength="256" name="cause" data-name="cause" id="cause" required="" />
                <div className="inline-text-block"> because </div>
                <textarea onChange={updateData.bind(this)} id="causeReason" name="causeReason" data-name="causeReason" maxLength="5000" className="w-input"></textarea>
            </div>
        </div>
    </div >
)

const BuildPurpose = () => (
    <div className="centered-div">
        <h3 className="section-title">Purpose</h3>
        <div className="structure-purpose-div">
            <div>
                <div id="impactVerbSelect" className="d2-input structure-purpose">
                    <div className="selection-title">Select your impact verb</div>
                    <h4>Impact Verb</h4>
                    <button onClick={replaceImpactVerb.bind(this)} className="structure-purpose-button impact-verb w-button"></button>
                    <button onClick={replaceImpactVerb.bind(this)} className="structure-purpose-button impact-verb w-button"></button>
                    <button onClick={replaceImpactVerb.bind(this)} className="structure-purpose-button impact-verb w-button"></button>
                </div>
            </div>
            <div className="ASE-selections">
                <div className="div-block-28">
                    <div id="talentSelect" className="d2-input structure-purpose">
                        <h4 className="heading-17">Talents</h4>
                        <button onClick={replaceStoryElement.bind(this)} id="talent1" className="structure-purpose-button talent w-button"></button>
                        <button onClick={replaceStoryElement.bind(this)} id="talent2" className="structure-purpose-button talent w-button"></button>
                        <button onClick={replaceStoryElement.bind(this)} id="talent3" className="structure-purpose-button talent w-button"></button>
                    </div>
                    <div id="passionSelect" className="d2-input structure-purpose">
                        <h4 className="heading-17">Passions</h4>
                        <button onClick={replaceStoryElement.bind(this)} id="passion1" className="structure-purpose-button passion w-button"></button>
                        <button onClick={replaceStoryElement.bind(this)} id="passion2" className="structure-purpose-button passion w-button"></button>
                        <button onClick={replaceStoryElement.bind(this)} id="passion3" className="structure-purpose-button passion w-button"></button>
                    </div>
                    <div id="storySelect" className="d2-input structure-purpose">
                        <h4 className="heading-17">Story</h4>
                        <button onClick={replaceStoryElement.bind(this)} id="adversity" className="structure-purpose-button story w-button"></button>
                        <button onClick={replaceStoryElement.bind(this)} id="cause" className="structure-purpose-button story w-button"></button>
                        <button onClick={replaceStoryElement.bind(this)} id="parentsLesson" className="structure-purpose-button story w-button"></button>
                        <button onClick={replaceStoryElement.bind(this)} id="teaching" className="structure-purpose-button story w-button"></button>
                    </div>
                </div>
                <div className="selection-title">Select your abstract component</div>
            </div>
        </div>
        <h3 id="draft">My purpose is to <strong id="impactVerb"></strong> others to <strong id="ASEComponent"></strong>!</h3>
        {loadSelectionButtons()}
    </div>
)

const FinalizePurpose = () => (
    <div className="centered-div">
        <h3 className="section-title">Purpose</h3>
        <div className="final-purpose-div">
            <p className="paragraph-2">
                Below is your first draft of your purpose statement! The sentence is likely not grammatically correct, and you may feel compelled to modify a couple words. Please do so! This is a living statement for now, please make it perfect for you.
            </p>
            <h3 id="draft"> </h3>
            {loadDraft()}
            <input onChange={updateData.bind(this)} type="text" className="vertical-text-field-list final-draft" maxLength="256" name="final" data-name="final" placeholder="Final purpose draft" id="finalPurpose" required="" />
        </div>
    </div>
)

const FinalPurpose = () => (
    <div className="centered-div" style={{ maxWidth: 600 }}>
        <h3 style={{ fontSize: 24, textAlign: "center" }}>
            Congratulations, you have completed Define My Purpose!
            </h3>
        <h3 id="draft" style={{ color: "#F7882F", fontSize: 22}}> </h3>
        {loadFinalPurpose()}
        <div className="text-block-5">On a scale of 1 - 7, how comfortable does this life purpose statement feel? (1 being least, 7 being most)</div>
        <select id="feedbackScore" name="feedbackScore" data-name="feedbackScore" className="feedback-score-select w-select">
            <option value="">Select...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
        </select>
        <div className="text-block-5">Do you have any feedback for the team on the process or experience?</div>
        <input type="text" style={{display: 'block'}} className="w-input" maxLength="256" name="feedback" data-name="feedback" placeholder="Feedback" id="feedback" required="" />

    </div>
)

export {
    StoryOne,
    StoryTwo,
    StoryThree,
    Formative,
    Talents,
    Capabilities,
    Passions,
    Philanthropy,
    BuildPurpose,
    FinalizePurpose,
    FinalPurpose
} 
