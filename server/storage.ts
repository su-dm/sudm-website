import { 
  InsertUser, 
  User, 
  Project, 
  InsertProject,
  Post,
  InsertPost,
  Contact,
  InsertContact
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User methods (from original template)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getAllProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Post methods (for both AI with AI and Notes)
  getAllPosts(): Promise<Post[]>;
  getPostById(id: number): Promise<Post | undefined>;
  getPostsByType(type: string): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private posts: Map<number, Post>;
  private contacts: Map<number, Contact>;
  private userId: number;
  private projectId: number;
  private postId: number;
  private contactId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.posts = new Map();
    this.contacts = new Map();
    this.userId = 1;
    this.projectId = 1;
    this.postId = 1;
    this.contactId = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }

  // Initialize with sample data
  private initSampleData() {
    // Sample projects
    const sampleProjects: InsertProject[] = [
      {
        title: "Smart Home IoT Hub",
        description: "A central hub for home automation with custom PCB design, ESP32 microcontroller, and cloud connectivity.",
        type: "hardware",
        tags: ["ESP32", "PCB Design", "MQTT"],
        link: "https://github.com/example/smart-home-hub",
      },
      {
        title: "Data Visualization Dashboard",
        description: "React-based dashboard for real-time IoT sensor data visualization with WebSocket integration.",
        type: "software",
        tags: ["React", "D3.js", "WebSockets"],
        link: "https://github.com/example/data-viz-dashboard",
      },
      {
        title: "Anomaly Detection System",
        description: "Machine learning system for detecting anomalies in industrial equipment using sensor data.",
        type: "ml/ai",
        tags: ["Python", "TensorFlow", "Time-Series Analysis"],
        link: "https://github.com/example/anomaly-detection",
      },
      {
        title: "Custom Drone Controller",
        description: "Designed and built a custom drone flight controller with embedded firmware and mobile app connectivity.",
        type: "hardware",
        tags: ["STM32", "Embedded C", "Bluetooth LE"],
        link: "https://github.com/example/drone-controller",
      },
    ];

    // Sample AI with AI posts
    const sampleAIPosts: InsertPost[] = [
      {
        title: "Building Neural Networks for Hardware Optimization",
        date: new Date("2023-06-15").toISOString(),
        type: "ai",
        excerpt: "How machine learning models can optimize circuit designs and power consumption in embedded systems.",
        content: `
# Building Neural Networks for Hardware Optimization

Hardware optimization has traditionally been a manual process, requiring extensive domain knowledge and experience. However, with recent advances in artificial intelligence, particularly neural networks, we can now automate and enhance this process.

## The Problem with Traditional Optimization

Circuit design and power optimization historically relied on engineer intuition and iterative testing. This approach has several limitations:

* Time-consuming manual iterations
* Limited exploration of the design space
* Difficulty handling multiple competing objectives
* Challenges scaling to complex modern circuits

## Neural Networks to the Rescue

Neural networks excel at finding patterns in complex data and optimizing for multiple objectives simultaneously. Here's how they can be applied to hardware optimization:

### 1. Predictive Power Modeling

By training neural networks on simulation data, we can create accurate power consumption models that predict how design changes will affect energy usage.

\`\`\`python
import tensorflow as tf
from tensorflow import keras

# Define a simple model for power prediction
def create_power_model(input_dim):
    model = keras.Sequential([
        keras.layers.Dense(64, activation='relu', input_shape=(input_dim,)),
        keras.layers.Dense(32, activation='relu'),
        keras.layers.Dense(16, activation='relu'),
        keras.layers.Dense(1)  # Power prediction output
    ])
    model.compile(optimizer='adam', loss='mse')
    return model

# Train on historical design data
model = create_power_model(input_dim=10)
model.fit(design_parameters, power_measurements, epochs=100, validation_split=0.2)
\`\`\`

### 2. Component Selection Optimization

Neural networks can recommend optimal component values based on circuit requirements and constraints.

### 3. Layout Optimization

Convolutional neural networks can analyze circuit layouts to minimize interference and optimize signal integrity.

In the next part of this series, we'll dive deeper into implementing these neural network approaches with practical code examples and case studies from real-world hardware projects.
        `,
        tags: ["Neural Networks", "Hardware Optimization", "Power Efficiency"],
      },
      {
        title: "Implementing LSTM Networks for Predictive Maintenance",
        date: new Date("2023-05-22").toISOString(),
        type: "ai",
        excerpt: "A practical guide to using Long Short-Term Memory networks for predicting equipment failures before they happen.",
        content: `
# Implementing LSTM Networks for Predictive Maintenance

Predictive maintenance is revolutionizing how we manage industrial equipment. By predicting failures before they occur, companies can reduce downtime and maintenance costs. Long Short-Term Memory (LSTM) networks, a type of recurrent neural network, are particularly well-suited for this task.

## Why LSTM for Predictive Maintenance?

Traditional time-series analysis methods struggle with the complex patterns in sensor data. LSTMs offer several advantages:

1. They can capture long-term dependencies in sequential data
2. They handle multivariate time-series data naturally
3. They can identify subtle patterns that precede failures
4. They're robust to noise and missing data

## Building an LSTM Predictive Maintenance Model

Let's walk through the process of building an LSTM model for predicting equipment failures:

### Data Preparation

First, we need to prepare our sensor data:

\`\`\`python
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler

# Load and preprocess sensor data
def prepare_data(data, sequence_length):
    scaler = MinMaxScaler()
    data_scaled = scaler.fit_transform(data)
    
    X, y = [], []
    for i in range(len(data_scaled) - sequence_length):
        X.append(data_scaled[i:i+sequence_length, :-1])
        y.append(data_scaled[i+sequence_length, -1])  # Last column is the target
        
    return np.array(X), np.array(y), scaler
\`\`\`

### Model Architecture

Next, we'll define our LSTM model:

\`\`\`python
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout

def create_lstm_model(sequence_length, n_features):
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(sequence_length, n_features)))
    model.add(Dropout(0.2))
    model.add(LSTM(50))
    model.add(Dropout(0.2))
    model.add(Dense(1))
    
    model.compile(optimizer='adam', loss='mse')
    return model
\`\`\`

### Training and Evaluation

Finally, we'll train and evaluate our model:

\`\`\`python
# Train the model
model = create_lstm_model(sequence_length=24, n_features=10)
history = model.fit(
    X_train, y_train,
    epochs=50,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)

# Evaluate on test data
y_pred = model.predict(X_test)
\`\`\`

## Interpreting Results for Maintenance Decisions

The raw predictions from our model need to be translated into actionable maintenance decisions. We can:

1. Set threshold values for "warning" and "critical" predictions
2. Calculate the probability of failure within different time windows
3. Combine our model outputs with domain expertise

In the next post, we'll explore how to deploy these models in real-world industrial settings and integrate them with existing maintenance systems.
        `,
        tags: ["LSTM", "TensorFlow", "Time-Series"],
      }
    ];
    
    // Sample Notes posts
    const sampleNotesPosts: InsertPost[] = [
      {
        title: "Optimizing PCB Thermal Management",
        date: new Date("2023-07-08").toISOString(),
        type: "notes",
        excerpt: "Best practices for thermal vias, copper pours, and component placement to manage heat dissipation in high-power circuits.",
        content: `
# Optimizing PCB Thermal Management

Thermal management is a critical aspect of PCB design that's often overlooked until problems arise. This note covers practical techniques for effective heat dissipation in high-power designs.

## The Basics of PCB Heat Transfer

Heat in PCBs is transferred through three mechanisms:

* Conduction: Direct heat transfer through solid materials
* Convection: Heat transfer through air movement
* Radiation: Heat transfer through electromagnetic waves

Effective thermal management addresses all three mechanisms, with conduction typically being the primary focus in PCB design.

## Thermal Vias: The PCB Designer's Best Friend

Thermal vias are plated through-holes that conduct heat from one layer of the PCB to another. They're especially useful for:

* Transferring heat from surface-mount components to inner or bottom copper planes
* Creating a path from hot components to heatsinks
* Distributing heat across the board to prevent hotspots

\`\`\`
Key Thermal Via Parameters:
- Diameter: 0.3mm-0.5mm typical
- Plating: Minimum 25μm copper
- Arrangement: Array or matrix pattern beneath hot components
- Spacing: 1mm-2mm between vias for optimal effectiveness
\`\`\`

## Copper Pour Strategies

Copper pours provide low thermal resistance paths for heat dissipation:

* Use solid copper planes when possible rather than hatched ground
* Connect high-power components directly to copper pours with multiple vias
* Consider dedicated thermal planes in multi-layer designs
* Be aware of current return paths when designing thermal pours

I'll update this note with more detailed examples and thermal simulations in the future. For now, these basics should help improve the thermal performance of your designs.
        `,
        tags: ["PCB Design", "Thermal Management"],
      },
      {
        title: "React Performance Optimization Techniques",
        date: new Date("2023-06-29").toISOString(),
        type: "notes",
        excerpt: "Practical strategies for improving React app performance through memoization, virtualization, and bundle optimization.",
        content: `
# React Performance Optimization Techniques

After working on several large-scale React applications, I've compiled some practical performance optimization techniques that have made a significant difference in application responsiveness.

## Identifying Performance Issues

Before optimizing, identify where the bottlenecks are:

1. Use React DevTools Profiler to record and analyze renders
2. Check for unnecessary re-renders
3. Look for long task execution in the Performance tab
4. Measure and monitor Largest Contentful Paint (LCP) and Time to Interactive (TTI)

## Memoization Techniques

### React.memo for Component Memoization

Prevent unnecessary re-renders by memoizing components that receive the same props:

\`\`\`jsx
const MemoizedComponent = React.memo(function MyComponent(props) {
  // Only re-renders if props change
  return <div>{props.name}</div>;
});
\`\`\`

### useMemo for Expensive Calculations

Cache the results of expensive calculations:

\`\`\`jsx
const expensiveComputation = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]); // Only recompute when a or b changes
\`\`\`

### useCallback for Event Handlers

Prevent child components from re-rendering due to new function references:

\`\`\`jsx
const handleClick = useCallback(() => {
  console.log('Clicked!');
}, []); // Empty dependency array means this function never changes
\`\`\`

## Code-Splitting and Lazy Loading

Break your application into smaller chunks that load on demand:

\`\`\`jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

## Virtualization for Long Lists

Use virtualization libraries like \`react-window\` or \`react-virtualized\` to render only visible items in long lists:

\`\`\`jsx
import { FixedSizeList } from 'react-window';

function MyList({ items }) {
  const renderRow = ({ index, style }) => (
    <div style={style}>
      {items[index]}
    </div>
  );

  return (
    <FixedSizeList
      height={500}
      width={300}
      itemCount={items.length}
      itemSize={35}
    >
      {renderRow}
    </FixedSizeList>
  );
}
\`\`\`

## Image Optimization

Optimize images for better performance:

1. Use modern formats like WebP
2. Implement responsive images with \`srcset\` and \`sizes\`
3. Consider lazy loading images outside the viewport

These techniques have helped me reduce initial load times by up to 60% and improve interaction responsiveness significantly. I'll continue to update this note as I discover new optimization strategies.
        `,
        tags: ["React", "Web Performance"],
      },
      {
        title: "Debugging Serial Communication Issues in Embedded Systems",
        date: new Date("2023-06-10").toISOString(),
        type: "notes",
        excerpt: "A systematic approach to troubleshooting UART, I2C, and SPI communication problems in microcontroller projects.",
        content: `
# Debugging Serial Communication Issues in Embedded Systems

Serial communication protocols are the backbone of embedded systems, allowing microcontrollers to communicate with sensors, actuators, and other devices. However, debugging these protocols can be challenging. Here's my systematic approach to troubleshooting the most common serial communication issues.

## Common Serial Protocols Overview

| Protocol | Speed | Wiring Complexity | Noise Immunity |
|----------|-------|-------------------|----------------|
| UART     | Low   | Simple (2-3 wires)| Moderate       |
| I2C      | Medium| Simple (2 wires)  | Low            |
| SPI      | High  | Complex (4+ wires)| High           |

## UART Troubleshooting

### Step 1: Verify Baud Rate and Format

Most UART issues stem from mismatched configuration:

\`\`\`c
// Common UART initialization
UART_HandleTypeDef huart1;
huart1.Instance = USART1;
huart1.Init.BaudRate = 115200;
huart1.Init.WordLength = UART_WORDLENGTH_8B;
huart1.Init.StopBits = UART_STOPBITS_1;
huart1.Init.Parity = UART_PARITY_NONE;
\`\`\`

Ensure both devices use identical settings, especially baud rate.

### Step 2: Check Hardware Connections

1. TX connects to RX (crossover)
2. Common ground is essential
3. Use oscilloscope to verify signal integrity

### Step 3: Software Flow Control

Check if you're properly handling flow control or buffer overruns:

\`\`\`c
// Simple robust UART receive function
bool UART_ReceiveWithTimeout(UART_HandleTypeDef *huart, uint8_t *buffer, uint16_t size, uint32_t timeout) {
    uint32_t startTime = HAL_GetTick();
    uint16_t receivedBytes = 0;
    
    while(receivedBytes < size) {
        if(HAL_GetTick() - startTime > timeout) {
            return false;  // Timeout occurred
        }
        
        if(HAL_UART_Receive(huart, &buffer[receivedBytes], 1, 10) == HAL_OK) {
            receivedBytes++;
        }
    }
    
    return true;  // Successfully received all bytes
}
\`\`\`

## I2C Debugging

### Step 1: Address Verification

I2C address conflicts or incorrect addressing are common issues:

\`\`\`c
// I2C address scanner
void I2C_ScanAddresses(I2C_HandleTypeDef *hi2c) {
    printf("Scanning I2C bus:\\n");
    
    for(uint8_t address = 1; address < 128; address++) {
        if(HAL_I2C_IsDeviceReady(hi2c, address << 1, 2, 10) == HAL_OK) {
            printf("Device found at address 0x%X\\n", address);
        }
    }
}
\`\`\`

### Step 2: Check Pull-up Resistors

I2C requires pull-up resistors on SDA and SCL lines (typically 4.7kΩ for 100kHz).

### Step 3: Analyze with Logic Analyzer

Look for:
- Proper start/stop conditions
- ACK/NACK signals
- Clock stretching issues

## SPI Debugging

### Step 1: Verify Clock Polarity and Phase

SPI has four modes (0-3) based on CPOL and CPHA:

\`\`\`c
// SPI configuration
hspi.Init.CLKPolarity = SPI_POLARITY_LOW;    // CPOL = 0
hspi.Init.CLKPhase = SPI_PHASE_1EDGE;        // CPHA = 0
// This is SPI Mode 0 (most common)
\`\`\`

### Step 2: Check Chip Select Timing

Ensure CS is properly managed around transactions:

\`\`\`c
// Proper CS handling
HAL_GPIO_WritePin(SPI_CS_GPIO_Port, SPI_CS_Pin, GPIO_PIN_RESET); // Assert CS
HAL_SPI_TransmitReceive(&hspi1, txData, rxData, size, timeout);
HAL_GPIO_WritePin(SPI_CS_GPIO_Port, SPI_CS_Pin, GPIO_PIN_SET);   // Deassert CS
\`\`\`

### Step 3: Verify Signal Integrity

Use oscilloscope to check for:
- Signal ringing
- Proper voltage levels
- Timing issues

## General Serial Debugging Tips

1. Start with a simple "echo" test to verify basic communication
2. Use printf debugging with timestamps for serial events
3. Monitor power supply stability during communication
4. Isolate hardware from software issues using known-good components

These methodical approaches have helped me solve countless serial communication issues. I'll update this note as I encounter and solve new challenges.
        `,
        tags: ["Embedded", "Debugging", "Serial Protocols"],
      }
    ];

    // Add sample data to storage
    sampleProjects.forEach(project => {
      this.createProject(project);
    });

    sampleAIPosts.forEach(post => {
      this.createPost(post);
    });

    sampleNotesPosts.forEach(post => {
      this.createPost(post);
    });
  }

  // User methods (from original template)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectId++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  // Post methods
  async getAllPosts(): Promise<Post[]> {
    return Array.from(this.posts.values());
  }

  async getPostById(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async getPostsByType(type: string): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.type === type)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.postId++;
    const date = insertPost.date || new Date().toISOString();
    const post: Post = { ...insertPost, id, date };
    this.posts.set(id, post);
    return post;
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
