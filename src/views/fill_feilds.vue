<template>
  <div class="main">
    <div class="constructor" @click="beforeAdd($event)">
      <span class="main-span">
        <span class="text" contenteditable="true" @click="getCursorLocation(event, 0)"></span>
      </span>
    </div>
    <div class="constructor-control">
      <button class="addblock-btn btn" @click="beforeAdd($event)">Add block</button>
      <button class="addblock-btn btn" @click="collectData">Collect and send</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      there: '',
      parentElement: null,
      childElements: [],
      massiv: [],
      cursorLocationIndex: '',
      firstSpan: '',
      secondSpan: '',
      insertAnswerType5: [],
      type5Example: [
        {
          text: 'Alisher Navoiy',
          type: 1
        },
        {
          text: '1441-1501',
          type: 2
        },
        {
          text: 'yillarda yashagan',
          type: 1
        },
        {
          text: 'davlat arbobi',
          type: 2
        }
      ]
    }
  },
  created() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace') {
        let focusedElement = document.activeElement
        let isTextSpan = focusedElement.matches('.text') || focusedElement.matches('.block-content')

        if (isTextSpan && focusedElement.textContent.trim() === '') {
          event.preventDefault()
          focusedElement.remove()
        }
      }
    })
  },
  mounted() {},

  methods: {
    blockAdder() {
      if (this.firstSpan && this.secondSpan) {
        this.blockAdderForCenter()
      } else {
        let mainSpan = document.querySelector('.main-span')
        const blockHTML = `<span class="block">
        <span class="block-content" contenteditable="true"></span>
        <span class="xbtn btn" contenteditable="false">x</span>
      </span>`
        const lastChild = mainSpan.lastElementChild
        const lastChildClassName = lastChild.className
        console.log(lastChildClassName)

        if (lastChildClassName !== 'block') {
          ;(async () => {
            mainSpan.insertAdjacentHTML('beforeend', blockHTML)
          })()
            .then(() => {
              let allBlocks = document.querySelectorAll('.block-content')
              let allBlocksLastAddedItemIndex = allBlocks.length - 1
              allBlocks[allBlocksLastAddedItemIndex].focus()
            })
            .then(() => {
              this.addRemoveBlockListener()
            })
        } else {
          this.$platonApp.errorToast("Ikita block contentni yonma yon qo'shish mumkin emas.")

          // Set cursor at the end of the last added block content
          const range = document.createRange()
          const sel = window.getSelection()
          const lastBlockContent = lastChild.querySelector('.block-content')
          range.selectNodeContents(lastBlockContent)
          range.collapse(false)
          sel.removeAllRanges()
          sel.addRange(range)
        }
      }
      this.firstSpan = ''
      this.secondSpan = ''
    },

    addRemoveBlockListener() {
      let allXButtons = Array.from(document.querySelectorAll('.xbtn'))
      let allElementsMainSpan = document.querySelector('.main-span')

      allXButtons.forEach((item, index) => {
        console.log(index)
        item.addEventListener('click', (event) => {
          let currentBlock = event.target.closest('.block')

          // Check if there is a <span class="text"> after the removed block
          let nextTextSpan = currentBlock.nextElementSibling
          if (nextTextSpan && nextTextSpan.classList.contains('text')) {
            // Absorb the text content of the preceding <span class="text">
            let precedingTextSpan = currentBlock.previousElementSibling
            if (precedingTextSpan && precedingTextSpan.classList.contains('text')) {
              precedingTextSpan.textContent =
                precedingTextSpan.textContent + ' ' + nextTextSpan.textContent
            }

            // Remove the <span class="text"> element after the block
            allElementsMainSpan.removeChild(nextTextSpan)
          }

          // Remove the current block
          allElementsMainSpan.removeChild(currentBlock)
        })
      })
    },

    //   textAdder(){
    //     let parentElement = event.target.closest(".constructor");
    //     let mainSpan = parentElement.querySelector(".main-span");
    //     const lastChild = mainSpan.lastElementChild;
    //     const lastChildClassName = lastChild.className;
    //    let allSpanText = Array.from(document.querySelectorAll("span.text"));
    //     // console.log("lastChild", lastChild === allSpanText[0]);
    //       if(lastChildClassName != 'text' ){
    //           (async () => {
    //             mainSpan.insertAdjacentHTML("beforeend", ' <span class="text" contenteditable="true"></span>');
    //           })().then(() => {
    //               let allTextSpans = document.querySelectorAll(".text");
    //               let allSpansLastAddedItemIndex = allTextSpans.length - 1;
    //               allTextSpans[allSpansLastAddedItemIndex].focus();
    //           })
    //       }else{
    //         const lastTextSpan = lastChild;
    //           lastTextSpan.focus();

    //           // Set cursor at the end of the last added text span
    //           const range = document.createRange();
    //           const sel = window.getSelection();
    //           range.selectNodeContents(lastTextSpan);
    //           range.collapse(false);
    //           sel.removeAllRanges();
    //           sel.addRange(range);
    //       }

    //   },

    textAdder() {
      let parentElement = event.target.closest('.constructor')
      let mainSpan = parentElement.querySelector('.main-span')
      const lastChild = mainSpan.lastElementChild
      const lastChildClassName = lastChild.className

      // let allSpanText = Array.from(document.querySelectorAll('span.text'))

      if (lastChildClassName != 'text') {
        ;(async () => {
          mainSpan.insertAdjacentHTML(
            'beforeend',
            ' <span class="text" contenteditable="true"  @click="getCursorLocation"></span>'
          )
        })().then(() => {
          let allTextSpans = document.querySelectorAll('.text')
          let allSpansLastAddedItemIndex = allTextSpans.length - 1
          // allTextSpans[allSpansLastAddedItemIndex].addEventListener("input", this.handleInput);
          allTextSpans[allSpansLastAddedItemIndex].addEventListener('click', (event) =>
            this.getCursorLocation(event, allSpansLastAddedItemIndex)
          )
          allTextSpans[allSpansLastAddedItemIndex].focus()
        })
      } else {
        const lastTextSpan = lastChild
        lastTextSpan.focus()

        // Set cursor at the end of the last added text span
        const range = document.createRange()
        const sel = window.getSelection()
        range.selectNodeContents(lastTextSpan)
        range.collapse(false)
        sel.removeAllRanges()
        sel.addRange(range)
      }
    },
    blockAdderForCenter() {
      const parentElement = document.querySelector('span.main-span')
      const allTextSpans = document.querySelectorAll('.text')

      allTextSpans[this.cursorLocationIndex].innerText = this.firstSpan

      let block = document.createElement('span')
      block.classList.add('block')

      let blockContent = document.createElement('span')
      blockContent.classList.add('block-content')
      blockContent.contentEditable = true
      block.appendChild(blockContent)

      let xbtn = document.createElement('span')
      xbtn.classList.add('xbtn', 'btn')
      xbtn.textContent = 'x'
      block.appendChild(xbtn)

      parentElement.insertBefore(block, allTextSpans[this.cursorLocationIndex].nextSibling)
      this.addRemoveBlockListener()

      let right = document.createElement('span')
      right.innerText = this.secondSpan
      right.classList.add('text')
      right.contentEditable = true
      right.addEventListener('click', (event) =>
        this.getCursorLocation(event, this.cursorLocationIndex + 1)
      )

      parentElement.insertBefore(right, block.nextSibling)

      this.firstSpan = ''
      this.secondSpan = ''
    },

    // handleInput(event) {
    //   this.inputText = event.target.innerHTML;
    // },
    getCursorLocation(event, spanIndex) {
      const allTextSpans = document.querySelectorAll('.text')

      // Validate the spanIndex
      if (spanIndex < 0 || spanIndex >= allTextSpans.length) {
        console.log('Invalid span index')
        return
      }

      this.cursorLocationIndex = spanIndex
      const cursorLocation = window.getSelection().getRangeAt(0).startOffset
      this.cursorLocation = cursorLocation

      // Check if the span has textContent
      if (allTextSpans[spanIndex].textContent) {
        this.firstSpan = allTextSpans[spanIndex].textContent.slice(0, cursorLocation)
        this.secondSpan = allTextSpans[spanIndex].textContent.slice(cursorLocation)
        console.log('Cursor Location for span ' + this.cursorLocationIndex + ': ' + cursorLocation)
        console.log('first', this.firstSpan, 'second', this.secondSpan)
      } else {
        console.log('Span does not have text content')
      }
    },

    populateContent() {
      for (let i = 0; i < this.massiv.length; i++) {
        let item = this.massiv[i]
        let element

        if (item.classNames === 'text') {
          element = document.createElement('span')
          element.classList.add('text')
          element.contentEditable = true
          element.textContent = item.textContent
        } else if (item.classNames === 'block-content') {
          element = document.createElement('span')
          element.classList.add('block')
          element.innerHTML = `
          <span class="block-content" contenteditable="true">${item.textContent}</span>
          <span class="xbtn btn" contenteditable="false">x</span>
        `
        }

        this.parentElement.appendChild(element)
      }
      this.addRemoveBlockListener()
    },

    beforeAdd(event) {
      let detectEvent = event.target.className

      if (detectEvent === 'addblock-btn btn') {
        this.there = 'block'
      } else {
        this.there = 'text'
      }

      if (event.target.matches('.text') || event.target.matches('.block-content')) {
        event.target.focus()
      } else {
        event.stopPropagation()
        let allBlockContent = Array.from(document.querySelectorAll('.block-content'))
        let allSpanText = Array.from(document.querySelectorAll('span.text'))

        let blockContentLastElement = allBlockContent.at(-1)
        let allSpanTextLastElement = allSpanText.at(-1)
        let blockContetnlastElementText = null
        let allSpanTextLastElementText = null

        if (blockContentLastElement) {
          blockContetnlastElementText = blockContentLastElement.innerText
        }
        if (allSpanTextLastElement) {
          allSpanTextLastElementText = allSpanTextLastElement.innerText
        }

        if (allBlockContent.length && allSpanText.length) {
          console.log('checking', allSpanTextLastElement == allSpanText[0])
          if (
            blockContetnlastElementText &&
            (allSpanTextLastElementText || allSpanTextLastElement == allSpanText[0])
          ) {
            if (this.there === 'text') {
              if (event.target.closest('.main-span > span')) {
                // Prevent the click event from propagating to the parent .constructor
                event.stopPropagation()
              }
              this.textAdder()
            }
            if (this.there === 'block') {
              if (event.target.closest('.main-span > span')) {
                // Prevent the click event from propagating to the parent .constructor
                event.stopPropagation()
              }
              this.blockAdder()
            }
          } else {
            if (!blockContetnlastElementText) {
              this.$platonApp.errorToast("Oxirgi qo'shilgan block contentni to'ldiring.")
              blockContentLastElement.focus()
            }
            if (!allSpanTextLastElementText) {
              this.$platonApp.errorToast("Oxirgi qo'shilgan text contentni to'ldiring.")
              allSpanTextLastElement.focus()
            }
            if (!blockContetnlastElementText && !allSpanTextLastElementText) {
              let allElementsMainSpan = document.querySelector('.main-span')
              let firstChildOfAllElements = allElementsMainSpan.firstElementChild
              let firstElementClassName = firstChildOfAllElements.classList.contains('text')
              if (firstElementClassName) {
                firstChildOfAllElements.focus()
              } else {
                let allBlockContent = Array.from(document.querySelectorAll('.block-content'))
                allBlockContent.find((element) => element.innerText === '').focus()
                this.$platonApp.errorToast("Bo'sh text contentni to'ldiring.")
              }
            }
          }
        } else if (allBlockContent.length) {
          let findEmptyElement = allBlockContent.find((element) => element.innerText === '')
          if (findEmptyElement) {
            findEmptyElement.focus()
            this.$platonApp.errorToast("Bo'sh block contentini to'ldiring.")
          } else {
            if (this.there === 'text') {
              this.textAdder()
            }
            if (this.there === 'block') {
              this.blockAdder()
            }
          }
        } else if (allSpanText.length) {
          let findEmptyElement = allSpanText.find((element) => element.innerText === '')
          console.log('checking empty elemnt', findEmptyElement == allSpanText[0])
          if (!findEmptyElement || findEmptyElement == allSpanText[0]) {
            if (this.there === 'text') {
              this.textAdder()
            }
            if (this.there === 'block') {
              this.blockAdder()
            }
          } else {
            findEmptyElement.focus()
            this.$platonApp.errorToast("Bo'sh text contentini to'ldiring.")
          }
        } else if (!allSpanText.length && !allBlockContent.length) {
          if (this.there === 'text') {
            this.textAdder()
          }
          if (this.there === 'block') {
            this.blockAdder()
          }
        }
      }
    },

    collectData() {
      // // Get the parent <span> element with the class "main-span"
      // this.parentElement = document.querySelector('span.main-span');

      // // Get all the child <span> elements
      // this.childElements = Array.from(this.parentElement.querySelectorAll('span'));

      // this.massiv = [];

      // let previousClassName = null;
      // let combinedTextContent = '';

      // for (let i = 0; i < this.childElements.length; i++) {
      //   let element = this.childElements[i];
      //   let classNames = Array.from(element.classList);
      //   let textContent = element.textContent.trim();

      //   if (classNames[0] !== "block" && classNames[0] !== "xbtn" && textContent) {
      //     if (previousClassName === classNames[0]) {
      //       combinedTextContent += ' ' + textContent;
      //     } else {
      //       if (combinedTextContent) {
      //         this.massiv.push({
      //           classNames: previousClassName,
      //           textContent: combinedTextContent.trim(),
      //         });
      //       }
      //       previousClassName = classNames[0];
      //       combinedTextContent = textContent;
      //     }
      //   }
      // }

      // // Add the last combined element
      // if (previousClassName && combinedTextContent) {
      //   this.massiv.push({
      //     classNames: previousClassName,
      //     textContent: combinedTextContent.trim(),
      //   });
      // }
      // console.log("massiv", this.massiv);

      //           // this.addEdit();
      //       this.populateContent();

      //                   for (let i=0; i<this.massiv.length; i++){
      //              let type='';
      //               if(this.massiv[0].classNames==='text'){
      //                 type=1;
      //               }
      //               else if(this.massiv[0].classNames==='block-content'){
      //                 type=2;
      //               }
      //               this.insertAnswerType5.push({
      //                 order:i,
      //                 text:this.massiv[i].textContent,
      //                 type:type,
      //               })
      //             }

      console.log('insertItem:', this.insertAnswerType5)
    }
  }
}
</script>
<style>
* {
  outline: none;
}

.main {
  margin-top: 100px;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.main-span {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 10px;
}

.constructor {
  padding: 8px 10px;
  margin-bottom: 19px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.text {
  display: inline-block;
  min-width: 5px;
  margin: 5px;
}

.block {
  background: #ffffff;
  border: 1px solid #d9d9d9;
  min-width: 144px;
  height: 42px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  padding-left: 10px;
  margin: 5px;
}

.block-content {
  flex-grow: 1;
  padding-right: 5px;
}

.block-content:focus {
  outline: none;
}

.xbtn {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #ec6047;
  border-radius: 6px;
  border: 1px solid currentColor;
  transition: linear 0.2s;
}

.xbtn:hover {
  color: white;
  background-color: #ec6047;
}
</style>
