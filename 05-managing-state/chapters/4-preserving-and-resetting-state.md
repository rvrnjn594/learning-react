# Preserving and Resetting State

State is isolated between components. React keeps track of which state belongs to which component bases on their place in the UI tree. You can control when to preserve state and when to reset it between re-renders.

> You will learn:
>
> - When React chooses to preserve or reset the state
> - How to force React to reset component's state
> - How keys and types affect whether the state is preserved

## State is tied to a position in the render tree

React builds render trees for the components structure in your UI.

When you give a component state, you might think the state "lives" inside the component. But the state actually help inside React.

**React associates each piece of state it's holding with the correct component by where that component sits in the render tree.**

> Here, there is only one Counter JSX tag, but it's rendered at two differnt positions:

    import { useState } from 'react';

    export default function App() {
        const counter = <Counter />;
        return (
            <div>
                {counter}
                {counter}
            </div>
        );
    }
    function Counter() {
        const [score, setScore] = useState(0);
        const [hover, setHover] = useState(false);
        let className = 'counter';
        if (hover) {
            className += ' hover';
        }
        return (
            <div
            className={className}
                onPointerEnter={() => setHover(true)}
                onPointerLeave={() => setHover(false)}
            >
                <h1>{score}</h1>
                <button onClick={() => setScore(score + 1)}>
                    Add one
                </button>
            </div>
        );
    }

> Here is how these look as a tree:
> ![render tree diagram](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_tree.png&w=828&q=75)

**These are two seperate counters because each is rendered at its own position in the tree.**

> In React, each component on the screen has fully isolated state. For example, if you render two Counter components side by side, each of them will get its own, independent, score and hover states.
>
> As you can see, when one counter is updated, only the state for that component is updated.
> ![updating state](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_increment.png&w=1080&q=75)

**React will keep the state around for as long as you render the same component at the same position in the tree.**

> To see example, increment both counters, them remove the second component by unchecking "Render the second counter" checkbox, and then add it back by ticking it again:

    import { useState } from 'react';

    export default function App() {
    const [showB, setShowB] = useState(true);
    return (
        <div>
        <Counter />
        {showB && <Counter />}
        <label>
            <input
            type="checkbox"
            checked={showB}
            onChange={e => {
                setShowB(e.target.checked)
            }}
            />
            Render the second counter
        </label>
        </div>
    );
    }

    function Counter() {
    const [score, setScore] = useState(0);
    const [hover, setHover] = useState(false);

    let className = 'counter';
    if (hover) {
        className += ' hover';
    }

    return (
        <div
        className={className}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        >
        <h1>{score}</h1>
        <button onClick={() => setScore(score + 1)}>
            Add one
        </button>
        </div>
    );
    }

> Notice how the moment you stop rendering the second counter, its state disappears completely. That's because **when React removes a component, it destroys its state.** >
>
> ![deleting a component](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_remove_component.png&w=1080&q=75)
>
> When you tick "Render the second counter", a second Counter and its state are initialized from scratch (score = 0) and added to the DOM.
>
> ![adding a component](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_add_component.png&w=1080&q=75)

**React preserves a component's state for as long as it's being rendered at its position in the UI tree.**  
 If it gets removed, or a different component gets rendered at the same position, React discards its state.

## Same component at the same position preserves state

> In this example, there are two differnt Counter tags:

    import { useState } from 'react';

    export default function App() {
        const [isFancy, setIsFancy] = useState(false);
        return (
            <div>
                {isFancy ? (
                    <Counter isFancy={true} />
                ) : (
                    <Counter isFancy={false} />
                )}
                <label>
                    <input type="checkbox" checked={isFancy} onChange={e => {setIsFancy(e.target.checked)}}
                />
                    Use fancy styling
                </label>
            </div>
        );
    }
    function Counter({ isFancy }) {
        const [score, setScore] = useState(0);
        const [hover, setHover] = useState(false);
        let className = 'counter';
        if (hover) {
            className += ' hover';
        }
        if (isFancy) {
            className += ' fancy';
        }
        return (
            <div className={className} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
                <h1>{score}</h1>
                <button onClick={() => setScore(score + 1)}>
                    Add one
                </button>
            </div>
        );
    }

> When you tick or clear the checkbox, the counter state does not get reset. Whether isFancy is true or false, you always have a counter as the first child of the div returned from the root App component:
>
> ![updating the App state does not reset the Counter because Counter stays in the same position](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_same_component.png&w=1200&q=75)

It's the same component at the same position, so from React's perspective, it's the same counter.

#### Pitfall

Remember that **it's the position in the UI tree - not in the JSX markup - that matters to React!** This component has two return clauses with differnt counter JSX tags inside and outside the if.

You might expect the state to react when you tick checkbox, but it doesn't! This is because **both of these Counter tags are rendered at the same position.**  
 React doesn't know where you place the conditions in your function. All it "sees" is the tree you return.

In both cases, the App component returns a div with Counter as a first child.  
 To React, these two counters have the same "address": the first child of the first child of the root.

This is how React matched them up between the previous and next renders, regardless of how you structure your logic.

## Different components at the same position reset state

In this example, ticking the checkbox will replace counter with a p:

    import { useState } from 'react';

    export default function App() {
        const [isPaused, setIsPaused] = useState(false);
        return (
            <div>
            {isPaused ? (
                <p>See you later!</p>
            ) : (
                <Counter />
            )}
            <label>
                <input
                type="checkbox"
                checked={isPaused}
                onChange={e => {
                    setIsPaused(e.target.checked)
                }}
                />
                Take a break
            </label>
            </div>
        );
    }
    function Counter() {
        const [score, setScore] = useState(0);
        const [hover, setHover] = useState(false);

        let className = 'counter';
        if (hover) {
            className += ' hover';
        }

        return (
            <div
            className={className}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            >
            <h1>{score}</h1>
            <button onClick={() => setScore(score + 1)}>
                Add one
            </button>
            </div>
        );
    }

> Here, you switch between different component types at the same position. Initially, the first child of the div contained a counter.
>
> But when you swapped in a p, React removed the counter from the UI tree and destroyed its state.
>
> ![destroying states]9https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_diff_pt1.png&w=1920&q=75
>
> ![switching back components](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_diff_pt2.png&w=1920&q=75)

And, **when you render a different component in the same position, it resets the state of its entire subtree.**

    import { useState } from 'react';

    export default function App() {
    const [isFancy, setIsFancy] = useState(false);
    return (
        <div>
        {isFancy ? (
            <div>
            <Counter isFancy={true} />
            </div>
        ) : (
            <section>
            <Counter isFancy={false} />
            </section>
        )}
        <label>
            <input
            type="checkbox"
            checked={isFancy}
            onChange={e => {
                setIsFancy(e.target.checked)
            }}
            />
            Use fancy styling
        </label>
        </div>
    );
    }

    function Counter({ isFancy }) {
    const [score, setScore] = useState(0);
    const [hover, setHover] = useState(false);

    let className = 'counter';
    if (hover) {
        className += ' hover';
    }
    if (isFancy) {
        className += ' fancy';
    }

    return (
        <div
        className={className}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        >
        <h1>{score}</h1>
        <button onClick={() => setScore(score + 1)}>
            Add one
        </button>
        </div>
    );
    }

> The counter state gets reset when you click the checkbox. Although you render a Counter, the first child of the div changes from a div to a section. When the child div was removed from the DOM, the whole tree below it (including the Counter and its state) was destroyed as well.
>
> ![when section changes to div](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_diff_same_pt1.png&w=1920&q=75)
>
> ![when switching back](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_diff_same_pt2.png&w=1920&q=75)

As a rule of thumb, **if you want to preserve the state between re-renders, the structure of your tree needs to "match up" from one render to another.**  
 If the structure is different, the state gets destroyed because React destroys state when it removes a component from the tree.

#### Pitfall

This is why you should not nest component function definitions.

Here, the MyTextField component function is defined inside MyComponent:

    import { useState } from 'react';

    export default function MyComponent() {
        const [counter, setCounter] = useState(0);
        function MyTextField() {
            const [text, setText] = useState('');
            return (
                <input value={text} onChange={e => setText(e.target.value)} />
            );
        }
        return (
            <>
                <MyTextField />
                <button onClick={() => {setCounter(counter + 1)}}>
                    Clicked {counter} times
                </button>
            </>
        );
    }

Every time you click the button, the input state disappers! This is because a differnt MyTextField function is created for every render of MyComponent.  
 You're rendering a different component in the same position, so React resets all state below. This leads to bugs and performance problems.

To avoid this problem, **always declare component functions at the top level, and don't nest their definitions.**

## Resetting state at the same position

By default, React preserves state of a component while it stays at the same position. Usually, this is exactly what you want, so it makes sense as the defauly behavior.  
 But sometimes, you may want to reset a component's state.

    import { useState } from 'react';

    export default function Scoreboard() {
        const [isPlayerA, setIsPlayerA] = useState(true);
        return (
            <div>
                {isPlayerA ? (
                    <Counter person="Taylor" />
                ) : (
                    <Counter person="Sarah" />
                )}
                <button onClick={() => {
                    setIsPlayerA(!isPlayerA);
                }}>
                    Next player!
                </button>
            </div>
        );
    }
    function Counter({ person }) {
        const [score, setScore] = useState(0);
        const [hover, setHover] = useState(false);
        let className = 'counter';
        if (hover) {
            className += ' hover';
        }
        return (
            <div
            className={className}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            >
            <h1>{person}'s score: {score}</h1>
            <button onClick={() => setScore(score + 1)}>
                Add one
            </button>
            </div>
        );
    }

> Currently, when you change the player, the score is preserved. The two Counters appear in the same position, so React sees them as the same Counter whose person prop has changed.
>
> But conceptually, in this app they should be two seperate counters. They might appear in the same place in the UI, but one is a counter for Taylor, and another is a counter for Sarah.
>
> There are two ways to reset state when switching them:
>
> 1. Render components in differnt positions.
> 2. Give each component an explicit identity with key

##### Option 1: Rendering a component in different positions

If you want these two Counters to be independent, you can render them in two differnt positions:

    export default function Scoreboard() {
        const [isPlayerA, setIsPlayerA] = useState(true);
        return (
            <div>
                {isPlayerA &&
                    <Counter person="Taylor" />
                }
                {!isPlayerA &&
                    <Counter person="Sarah" />
                }
                <button onClick={() => {
                    setIsPlayerA(!isPlayerA);
                }}>
                    Next player!
                </button>
            </div>
        );
    }

> - Initially, isPlayerA is true. So the first position contains Counter state, and the second one is empty.
> - When you click the "Next player" button the first position clears but the second one now contains a Counter.
>   ![positions of components in the tree](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_diff_position_p2.png&w=1080&q=75)

Each Counter's state gets destroyed each time it's removed from the DOM. This is why they reset every time you click button.

This solution is convenient when you only have a few independent components rendered in the same place. In this example, you only have two, so it's not a hassle to render both seperately in the JSX.

##### Option 2: Resetting state with a key

There is also another, more generic, way to reset a component's state.

You might have seen keys when rendering lists. Keys aren't just for lists!

You can use keys to make React distinguish between any components. By default, React uses order within the parent ("first counter", "second counter") to discern between components. But keys let you tell React that this is not just a first counter, or a second counter, but a specific counter - eg: Taylor's counter. This way, React will know Taylor's counter wherever it appers in the tree!

> In this examples, the two Counters don't share state even though they appear in the same place in JSX:

    import { useState } from 'react';

    export default function Scoreboard() {
        const [isPlayerA, setIsPlayerA] = useState(true);
        return (
            <div>
                {isPlayerA ? (
                    <Counter key="Taylor" person="Taylor" />
                ) : (
                    <Counter key="Sarah" person="Sarah" />
                )}
                <button onClick={() => {
                    setIsPlayerA(!isPlayerA);
                }}>
                    Next player!
                </button>
            </div>
        );
    }
    function Counter({ person }) {
        const [score, setScore] = useState(0);
        const [hover, setHover] = useState(false);
        let className = 'counter';
        if (hover) {
            className += ' hover';
        }
        return (
            <div
            className={className}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            >
                <h1>{person}'s score: {score}</h1>
                <button onClick={() => setScore(score + 1)}>
                    Add one
                </button>
            </div>
        );
    }

Switching between Taylor and Sarah does not preserve the state. This is because **you gave them differnt keys:**

    {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
    ) : (
        <Counter key="Sarah" person="Sarah" />
    )}

**Specifying a key tells React to use the key itself as part of the position, instead of their order within the parent.** This is why, even though you render them in the same place in JSX, React sees them as two different counters, and so they will never share state.  
 Every time a counter appears on the screen, its state is created.  
 Every time it is removed, its state is destroyed.  
Toggling between them resets their state over and over.

**Note:** Remember that keys are not globally unique. They only specify the position within the parent.

## Resetting a form with a key

Resetting state with a key is particularly useful when dealing with forms.

In this chat app, the Chat component contains the text input state:

    import { useState } from 'react';

    function Chat({ contact }) {
        const [text, setText] = useState('');
        return (
            <section className="chat">
                <textarea
                    value={text}
                    placeholder={'Chat to ' + contact.name}
                    onChange={e => setText(e.target.value)}
                />
                <br />
                <button>Send to {contact.email}</button>
            </section>
        );
    }
    function ContactList({
        selectedContact,
        contacts,
        onSelect
    }) {
        return (
            <section className="contact-list">
                <ul>
                    {contacts.map(contact =>
                        <li key={contact.id}>
                            <button onClick={() => {onSelect(contact);}}>
                                {contact.name}
                            </button>
                        </li>
                    )}
                </ul>
            </section>
        );
    }

    export default function Messenger() {
        const [to, setTo] = useState(contacts[0]);
        return (
            <div>
                <ContactList contacts={contacts} selectedContact={to} onSelect={contact => setTo(contact)} />
                <Chat contact={to} />
            </div>
        )
    }

    const contacts = [
        { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
        { id: 1, name: 'Alice', email: 'alice@mail.com' },
        { id: 2, name: 'Bob', email: 'bob@mail.com' }
    ];

Try entering something into the input, and then press "Alice" or "Bob" to choose a different recipient. You will notice that the input state is preserved because the Chat is rendered at the same position in the tree.

**In many apps, this may be desired behavior, but not in a chat app!**

You don't want to let the user send a message they already typed to a wrong person due to an accidental click. To fix it, add a key:

    <Chat key={to.id} contact={to} />

This ensures that when you select a different recipient, the Chat component will be rendered from scratch, including any state in the tree below it.  
 React will also re-create the DOM elements instead of reusing them.

Now switching the recipient always clears the text field:

    export default function Messenger() {
    const [to, setTo] = useState(contacts[0]);
    return (
        <div>
        <ContactList
            contacts={contacts}
            selectedContact={to}
            onSelect={contact => setTo(contact)}
        />
        <Chat key={to.id} contact={to} />
        </div>
    )
    }

---

#### Deep Dive

###### Preserving state for removed components

In a real chat app, **you’d probably want to recover the input state when the user selects the previous recipient again.**

> There are a few ways to keep the state “alive” for a component that’s no longer visible:
>
> - You could render all chats instead of just the current one, but hide all the others with CSS. The chats would not get removed from the tree, so their local state would be preserved. This solution works great for simple UIs. But it can get very slow if the hidden trees are large and contain a lot of DOM nodes.
> - You could lift the state up and hold the pending message for each recipient in the parent component. This way, when the child components get removed, it doesn’t matter, because it’s the parent that keeps the important information. This is the most common solution.
> - You might also use a different source in addition to React state. For example, you probably want a message draft to persist even if the user accidentally closes the page. To implement this, you could have the Chat component initialize its state by reading from the localStorage, and save the drafts there too.

No matter which strategy you pick, a chat with Alice is conceptually distinct from a chat with Bob, so it makes sense to give a key to the Chat tree based on the current recipient.

---

##### Recap

- React keeps state for as long as the same component is rendered at the same position.
- State is not kept in JSX tags. It’s associated with the tree position in which you put that JSX.
- You can force a subtree to reset its state by giving it a different key.
- Don’t nest component definitions, or you’ll reset state by accident.
