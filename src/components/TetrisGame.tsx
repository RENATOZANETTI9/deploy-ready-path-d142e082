import { useEffect, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 16;
const CELL_SIZE = 20;

const SHAPES = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[0, 1, 0], [1, 1, 1]], // T
  [[1, 0, 0], [1, 1, 1]], // L
  [[0, 0, 1], [1, 1, 1]], // J
  [[0, 1, 1], [1, 1, 0]], // S
  [[1, 1, 0], [0, 1, 1]], // Z
];

const COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F", "#BB8FCE"
];

export const TetrisGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  const boardRef = useRef<number[][]>(
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0))
  );
  const currentPieceRef = useRef<{
    shape: number[][];
    position: Position;
    color: string;
  } | null>(null);

  const createNewPiece = () => {
    const shapeIndex = Math.floor(Math.random() * SHAPES.length);
    return {
      shape: SHAPES[shapeIndex],
      position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
      color: COLORS[shapeIndex],
    };
  };

  const checkCollision = (piece: typeof currentPieceRef.current, offsetX = 0, offsetY = 0) => {
    if (!piece) return true;
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = piece.position.x + x + offsetX;
          const newY = piece.position.y + y + offsetY;
          
          if (
            newX < 0 || 
            newX >= BOARD_WIDTH || 
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && boardRef.current[newY][newX])
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const mergePiece = () => {
    const piece = currentPieceRef.current;
    if (!piece) return;

    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const boardY = piece.position.y + y;
          const boardX = piece.position.x + x;
          if (boardY >= 0) {
            boardRef.current[boardY][boardX] = COLORS.indexOf(piece.color) + 1;
          }
        }
      }
    }
  };

  const clearLines = () => {
    let linesCleared = 0;
    
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (boardRef.current[y].every(cell => cell !== 0)) {
        boardRef.current.splice(y, 1);
        boardRef.current.unshift(Array(BOARD_WIDTH).fill(0));
        linesCleared++;
        y++; // Check this line again
      }
    }
    
    if (linesCleared > 0) {
      setScore(prev => prev + linesCleared * 100);
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "#2a2a3e";
    ctx.lineWidth = 1;
    for (let y = 0; y <= BOARD_HEIGHT; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(BOARD_WIDTH * CELL_SIZE, y * CELL_SIZE);
      ctx.stroke();
    }
    for (let x = 0; x <= BOARD_WIDTH; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, BOARD_HEIGHT * CELL_SIZE);
      ctx.stroke();
    }

    // Draw board
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        if (boardRef.current[y][x]) {
          ctx.fillStyle = COLORS[boardRef.current[y][x] - 1];
          ctx.fillRect(x * CELL_SIZE + 1, y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
        }
      }
    }

    // Draw current piece
    const piece = currentPieceRef.current;
    if (piece) {
      ctx.fillStyle = piece.color;
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x]) {
            ctx.fillRect(
              (piece.position.x + x) * CELL_SIZE + 1,
              (piece.position.y + y) * CELL_SIZE + 1,
              CELL_SIZE - 2,
              CELL_SIZE - 2
            );
          }
        }
      }
    }

    // Draw game over
    if (gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, BOARD_HEIGHT * CELL_SIZE / 2 - 30, BOARD_WIDTH * CELL_SIZE, 60);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", BOARD_WIDTH * CELL_SIZE / 2, BOARD_HEIGHT * CELL_SIZE / 2);
    }
  };

  const movePiece = (dx: number, dy: number) => {
    if (!currentPieceRef.current || gameOver) return false;
    
    if (!checkCollision(currentPieceRef.current, dx, dy)) {
      currentPieceRef.current.position.x += dx;
      currentPieceRef.current.position.y += dy;
      return true;
    }
    return false;
  };

  const rotatePiece = () => {
    if (!currentPieceRef.current || gameOver) return;
    
    const rotated = currentPieceRef.current.shape[0].map((_, i) =>
      currentPieceRef.current!.shape.map(row => row[i]).reverse()
    );
    
    const original = currentPieceRef.current.shape;
    currentPieceRef.current.shape = rotated;
    
    if (checkCollision(currentPieceRef.current)) {
      currentPieceRef.current.shape = original;
    }
  };

  useEffect(() => {
    currentPieceRef.current = createNewPiece();
    
    const gameLoop = setInterval(() => {
      if (gameOver) return;
      
      if (!movePiece(0, 1)) {
        mergePiece();
        clearLines();
        
        currentPieceRef.current = createNewPiece();
        
        if (checkCollision(currentPieceRef.current)) {
          setGameOver(true);
        }
      }
      
      draw();
    }, 500);

    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;
      
      switch (e.key) {
        case "ArrowLeft":
          movePiece(-1, 0);
          break;
        case "ArrowRight":
          movePiece(1, 0);
          break;
        case "ArrowDown":
          movePiece(0, 1);
          break;
        case "ArrowUp":
          rotatePiece();
          break;
      }
      draw();
    };

    window.addEventListener("keydown", handleKeyPress);
    draw();

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameOver]);

  const resetGame = () => {
    boardRef.current = Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0));
    currentPieceRef.current = createNewPiece();
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-muted/30 rounded-lg">
      <div className="flex items-center justify-between w-full max-w-[200px]">
        <span className="text-sm font-semibold">Pontos: {score}</span>
        {gameOver && (
          <button
            onClick={resetGame}
            className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            Reiniciar
          </button>
        )}
      </div>
      
      <canvas
        ref={canvasRef}
        width={BOARD_WIDTH * CELL_SIZE}
        height={BOARD_HEIGHT * CELL_SIZE}
        className="border-2 border-border rounded shadow-lg"
      />
      
      <div className="text-xs text-muted-foreground text-center space-y-1">
        <p>Use as setas do teclado para jogar</p>
        <p>↑ Girar | ← → Mover | ↓ Descer</p>
      </div>
    </div>
  );
};
