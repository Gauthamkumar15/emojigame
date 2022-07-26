import './index.css'

import {Component} from 'react'

import NavBar from '../NavBar'

import EmojiCard from '../EmojiCard'

class EmojiGame extends Component {
  state = {score: 0, topScore: 0, idOfClickedEmojis: [], isComplete: false}

  onClickedEmoji = id => {
    const {idOfClickedEmojis, score,topScore} = this.state
    if (idOfClickedEmojis.includes(id)) {
      if (score > topScore){
      this.setState({topScore:score,isComplete: true})}
      else {
        this.setState({isComplete: true})
      }
    } else if (score === 11) {
      this.setState({
        score: 12,
        topScore: 12,
        isComplete: true,
      })
    } else {
      this.setState(prevState => ({
        idOfClickedEmojis: [...prevState.idOfClickedEmojis, id],
        score: prevState.score + 1,
      }))
    }
  }

 
  playAgain = () => {
    this.setState({score: 0, idOfClickedEmojis: [], isComplete: false})
  }

  render() {
    const {score, topScore, isComplete} = this.state

    const winOrLoss = score === 12 ? 'You Won' : 'You Lose'
    const scoreText = score === 12 ? 'Best Score' : 'Score'
    const image =
      score === 12
        ? 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png'

    const shuffledEmojisList = () => {
      const {emojisList} = this.props
      return emojisList.sort(() => Math.random() - 0.5)
    }

    return (
      <div className="bg-container">
        <NavBar isComplete={isComplete} score={score} topScore={topScore} />
      <div className = "container">
        {isComplete && (
          <div className='game-result'>
            <div className='result'>
            <h1 className='heading'>{winOrLoss}</h1>
            <p className='score1'>{scoreText}</p>
            <p className='value'>{score}/12</p>
            <button className='button' onClick={this.playAgain} type="button">
              Play Again
            </button>
            </div>
            <div className='image'>
              <img className='image2' src={image} alt="win or lose" />
            </div>
          </div>
        )}

        {!isComplete && (
          <div className="emoji-container">
            {shuffledEmojisList().map(eachItem => (
              <EmojiCard
                key={eachItem.id}
                eachItem={eachItem}
                onClickedEmoji={this.onClickedEmoji}
              />
            ))}
          </div>
        )}
        </div>
      </div>
    )
  }
}

export default EmojiGame
